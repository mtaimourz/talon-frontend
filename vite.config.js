import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    server: {
        host: "0.0.0.0",
        port: 5173,
        // Only used when VITE_USE_MOCKS=false, i.e. once the real backend exists.
        proxy: {
            "/api/identity": "http://localhost:4001",
            "/api/vmaudit": "http://localhost:4002",
        },
    },
});
