/**
 * Tiny data-fetch helper: runs an async API call on mount, exposing reactive
 * data / loading / error plus a refresh(). Keeps view scripts terse.
 */

import { onMounted, ref, shallowRef, type Ref } from "vue";
import { ApiError } from "@/api";

export interface UseApi<T> {
  data: Ref<T>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  refresh: () => Promise<void>;
}

export function useApi<T>(fn: () => Promise<T>, initial: T, immediate = true): UseApi<T> {
  const data = shallowRef(initial) as Ref<T>;
  const loading = ref(immediate);
  const error = ref<string | null>(null);

  const refresh = async () => {
    loading.value = true;
    error.value = null;
    try {
      data.value = await fn();
    } catch (e) {
      error.value = e instanceof ApiError ? e.message : "Something went wrong";
    } finally {
      loading.value = false;
    }
  };

  if (immediate) onMounted(refresh);
  return { data, loading, error, refresh };
}
