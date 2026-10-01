import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

/**
 * Live-preview OAuth popup
 */
function authPopupPlugin() {
  return {
    name: "app-builder:auth-popup",
    apply: "serve" as const,
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const rawUrl = req.url ?? "";
        const pathOnly = rawUrl.split("?", 1)[0] ?? "";
        if (pathOnly !== "/auth/popup") {
          next();
          return;
        }
        res.statusCode = 404;
        res.end("Not Found");
      });
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    authPopupPlugin(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
