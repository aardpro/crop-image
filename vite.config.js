// vite.config.js
import { fileURLToPath } from "url";
import { resolve } from "path";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    lib: {
      outDir: "dist",
      entry: resolve(__dirname, "src/package-entry.ts"),
      name: "cropImage",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      output: {},
    },
  },
});
