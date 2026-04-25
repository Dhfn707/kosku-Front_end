import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Ambil base URL tanpa path /api untuk target proxy
  let targetUrl = "http://kosku-backend.ddev.site:8080";
  try {
    if (env.VITE_API_URL && env.VITE_API_URL.startsWith('http')) {
      targetUrl = new URL(env.VITE_API_URL).origin;
    }
  } catch (e) {}
  
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
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
