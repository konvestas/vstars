import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Vstars Transfer',
        short_name: 'Vstars',
        description: "Premium VIP transfer services in Istanbul for business and leisure travelers, including private airport transfers with stress-free arrivals & departures " +
            "also chauffeured city travel and medical tourism",
        start_url: '/en',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/logo-icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/logo-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/logo-icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
    };
}