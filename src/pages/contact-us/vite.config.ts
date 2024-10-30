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
  server: {
    open: "/src/pages/contact-us/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        "contact-us": "src/pages/contact-us/main.tsx",
      },
      output: {
        entryFileNames: "[name]/index.js",
      },
    },
  },
});
