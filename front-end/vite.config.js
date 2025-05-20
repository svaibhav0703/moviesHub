import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // allows avoiding CORS error
      "/api/": "https://movieshub-ivub.onrender.com",
      "/uploads": "https://movieshub-ivub.onrender.com",
    },
  },
});
