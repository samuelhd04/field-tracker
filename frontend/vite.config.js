import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            strategies: "injectManifest",
            injectRegister: null,
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
                type: "module",
            },
            manifest: {
                name: "Mi App",
                display: "standalone",
                start_url: "/",
                icons: [
                    {
                        src: "/icons/192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icons/512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
