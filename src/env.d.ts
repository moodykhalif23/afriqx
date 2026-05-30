/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the AFRIQX API, e.g. http://localhost:8080/api/v1 */
  readonly VITE_API_URL?: string;
  /** WebSocket URL for the live feed; derived from VITE_API_URL if unset. */
  readonly VITE_WS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
