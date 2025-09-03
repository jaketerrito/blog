import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({ customViteReactPlugin: true }),
    viteReact(),
  ],
});
