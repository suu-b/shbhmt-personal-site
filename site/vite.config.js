import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5000,
    allowedHosts: [
      "62ccbe5e-914b-4ad4-b358-6cad4014f713-00-q27ydusyold5.pike.repl.co",
    ],
  },
});
