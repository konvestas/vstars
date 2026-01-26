import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Vstars Transfer',
        short_name: 'Vstars',
        description: "Premium VIP transfer services in Istanbul for business and leisure travelers, including private airport transfers with stress-free arrivals & departures " +
            "also chauffeured city travel and medical tourism",
        start_url: '/en',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#FFFFFF',
        icons: [
            {
                src: '/public/favicon.ico',
                sizes: '48x48',
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
    };
}