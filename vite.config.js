// vite.config.js
import { fileURLToPath } from "url";
import { resolve } from "path";
import { defineConfig } from "vite";
import copy from 'rollup-plugin-copy';
import terser from '@rollup/plugin-terser';

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
      plugins: [
        copy({
          verbose: true,
          hook: 'writeBundle',
          targets: [
            { src: './lib/readme.MD', dest: './dist' },
            { src: './lib/package.json', dest: './dist' },
            { src: './lib/index.d.ts', dest: './dist' },
          ],
        }),
      ],
      output: {
        plugins: [
          terser(),
        ],
      },
    },
  },
});
