import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target:
          mode === "development"
            ? "http://localhost:8000" // local backend for dev
            : process.env.VITE_API_URL, // render backend for prod
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
