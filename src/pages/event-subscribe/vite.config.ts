import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  server: {
    open: "/src/pages/event-subscribe/index.html",
  },
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      input: {
        "event-subscribe": "src/pages/event-subscribe/main.tsx",
      },
      output: {
        entryFileNames: "[name]/index.js",
      },
    },
  },
});
