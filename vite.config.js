import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Ambil base URL tanpa path /api untuk target proxy
  const targetUrl = env.VITE_API_URL ? new URL(env.VITE_API_URL).origin : "http://kosku-backend.ddev.site:8080";
  
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: targetUrl,
          changeOrigin: true,
        },
        "/sanctum": {
          target: targetUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
