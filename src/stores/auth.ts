/**
 * Reactive auth state shared across the app. Backed by the API client's token
 * (localStorage) plus a cached user profile, so a refresh keeps you signed in.
 */

import { computed, reactive } from "vue";
import { authApi, type PublicUser } from "@/api";
import { getToken, setToken, setUnauthorizedHandler } from "@/api/http";

const USER_KEY = "afriqx_user";

function loadUser(): PublicUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PublicUser;
  } catch {
    return null;
  }
}

const state = reactive<{ user: PublicUser | null; token: string | null }>({
  user: loadUser(),
  token: getToken(),
});

function setSession(token: string, user: PublicUser): void {
  state.token = token;
  state.user = user;
  setToken(token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession(): void {
  state.token = null;
  state.user = null;
  setToken(null);
  localStorage.removeItem(USER_KEY);
}

export const isAuthenticated = computed(() => !!state.token);

export const auth = {
  state,
  isAuthenticated,

  async login(email: string, password: string): Promise<void> {
    const res = await authApi.login(email, password);
    setSession(res.token, res.user);
  },

  async register(email: string, password: string, name: string): Promise<void> {
    const res = await authApi.register(email, password, name);
    setSession(res.token, res.user);
  },

  logout(): void {
    clearSession();
  },

  /** Refresh the cached profile from the server (best-effort). */
  async refreshUser(): Promise<void> {
    if (!state.token) return;
    try {
      const user = await authApi.me();
      state.user = user;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      // 401 is handled globally by the unauthorized handler.
    }
  },

  /** Update the cached display name without a round-trip (e.g. after Settings save). */
  patchUser(patch: Partial<PublicUser>): void {
    if (!state.user) return;
    state.user = { ...state.user, ...patch };
    localStorage.setItem(USER_KEY, JSON.stringify(state.user));
  },
};

/** Wire global 401 handling: clear the session so the router guard redirects. */
export function installAuthInterceptor(): void {
  setUnauthorizedHandler(() => {
    clearSession();
  });
}
