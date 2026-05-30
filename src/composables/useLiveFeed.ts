/**
 * Subscribes to the backend WebSocket live feed and exposes reactive ticker +
 * active-pair state. Auto-reconnects with backoff; cleans up on unmount.
 */

import { onMounted, onUnmounted, ref } from "vue";
import { apiBaseUrl } from "@/api";
import type { LiveTick, TickerItem } from "@/api/types";

function resolveWsUrl(): string {
  const explicit = import.meta.env.VITE_WS_URL;
  if (explicit) return explicit;
  // Derive from the API base: http(s)://host/api/v1 -> ws(s)://host/api/v1/ws
  const url = new URL(apiBaseUrl, window.location.origin);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = `${url.pathname.replace(/\/$/, "")}/ws`;
  return url.toString();
}

export function useLiveFeed() {
  const ticker = ref<TickerItem[]>([]);
  const activePair = ref<LiveTick["activePair"] | null>(null);
  const connected = ref(false);

  let socket: WebSocket | null = null;
  let retry = 0;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let closed = false;

  const connect = () => {
    if (closed) return;
    try {
      socket = new WebSocket(resolveWsUrl());
    } catch {
      scheduleReconnect();
      return;
    }

    socket.onopen = () => {
      connected.value = true;
      retry = 0;
    };
    socket.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data) as LiveTick;
        if (msg.type === "tick") {
          ticker.value = msg.ticker;
          activePair.value = msg.activePair;
        }
      } catch {
        // ignore malformed frames
      }
    };
    socket.onclose = () => {
      connected.value = false;
      scheduleReconnect();
    };
    socket.onerror = () => socket?.close();
  };

  const scheduleReconnect = () => {
    if (closed) return;
    const delay = Math.min(1000 * 2 ** retry, 15000);
    retry += 1;
    reconnectTimer = setTimeout(connect, delay);
  };

  onMounted(connect);
  onUnmounted(() => {
    closed = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    socket?.close();
  });

  return { ticker, activePair, connected };
}
