/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "false" switches from the mock API to the real backend proxy. */
  readonly VITE_USE_MOCKS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
