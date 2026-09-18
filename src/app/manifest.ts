import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: 'Vstars Transfer',
        short_name: 'Vstars',
        description: "Premium VIP transfer services in Istanbul for business and leisure travelers, including private airport transfers with stress-free arrivals & departures " +
            "also chauffeured city travel and medical tourism",
        lang: "en",
        dir: "ltr",
        categories: ["transportation", "business"],
        start_url: '/en',
        scope: "/",
        display: 'standalone',
        display_override: [
            "window-controls-overlay",
            "standalone",
            "minimal-ui"
        ],
        orientation: "landscape-primary",
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        prefer_related_applications: false,
        launch_handler: {
            "client_mode": "focus-existing"
        },
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/ico',
                purpose: "maskable"
            },
            {
                src: '/logo-icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: "maskable"
            },
            {
                src: '/logo-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: "maskable"
            },
        ],
        screenshots: [
            {
                "src": "/screenshot-mobile.png",
                "sizes": "402x874",
                "type": "image/png",
                "form_factor": "narrow",
                "platform": "ios"
            },
            {
                "src": "/screenshot-desktop.png",
                "sizes": "1920x1080",
                "type": "image/png",
                "form_factor": "wide",
                "platform":"windows",
            }
        ]
    };
}