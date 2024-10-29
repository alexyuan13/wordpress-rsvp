import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      input: {
        "join-form-widget": "src/pages/join-form-widget/main.tsx",
      },
      output: {
        entryFileNames: "[name]/index.js",
      },
    },
  },
});
