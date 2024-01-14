import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, "./", "");

  return {
    plugins: [react(), eslint(), checker({ typescript: true, overlay: false })],
    server: {
      proxy: {
        "/api": "http://localhost:4200",
      },
      host: true,
      port: 8000,
      hmr: {},
    },
  };
});
