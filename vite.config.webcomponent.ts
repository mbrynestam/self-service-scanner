import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite config for building the web component bundle
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    outDir: "dist-webcomponent",
    lib: {
      entry: path.resolve(__dirname, "src/web-component.tsx"),
      name: "BuyrScanner",
      fileName: (format) => `buyr-scanner.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      // Don't externalize React - bundle it
      external: [],
      output: {
        // Provide global variables for UMD build
        globals: {},
        // Inline all styles
        assetFileNames: "buyr-scanner.[ext]",
      },
    },
    cssCodeSplit: false,
    minify: "terser",
  },
});
