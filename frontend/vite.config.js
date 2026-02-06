import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "three/webgpu": path.resolve(__dirname, "src/stubs/webgpu.js"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js into its own chunk
          three: ["three"],
          // Split react-force-graph-3d into its own chunk
          "force-graph": ["react-force-graph-3d"],
          // Split React and React DOM
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
