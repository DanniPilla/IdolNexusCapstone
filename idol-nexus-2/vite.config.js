import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react", "react-dom"], // Add dependencies you want pre-bundled
  },
  build: {
    rollupOptions: {
      input: "./app.jsx", // Specify your entry point
    },
  },
});
