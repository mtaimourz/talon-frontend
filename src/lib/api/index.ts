import type { ApiClient } from "./contract";
import { realApi } from "./client";
import { mockApi } from "./mock";

// Default to the mock so the UI runs end-to-end with no backend. Set
// VITE_USE_MOCKS=false (see .env.example) once identity/vmaudit are wired up.
const useMocks = import.meta.env.VITE_USE_MOCKS !== "false";

export const api: ApiClient = useMocks ? mockApi : realApi;

export type { ApiClient } from "./contract";
