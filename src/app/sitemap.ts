import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.vstarstransfer.com';
const locales = ['en', 'tr', 'de', 'ru'];

const paths = [
    '',
    '/services',
    '/affiliates',
    '/contact',
    '/FAQ',
];
// TAMAMLA
const imagesByPath: Record<string, string[]> = {
    '': [
        '/vstars/vstars-fleet.webp',
        '/images/istanbul-hourly-hire-private-driver.webp',
        '/images/istanbul-airport-vip-transfer-mercedes.webp',
        '/affiliates/can-duman-medical-tourism.webp',
        '/images/istanbul-15-Temmuz-bridge-view-scenery.webp',
        '/vstars/vstars-transfer-vehicle-inside-reverse-view.webp',
        '/vstars/vstars-transfer-vehicle-outside-view.webp',
        '/vstars/vstars-transfer-vehicle-vip-interior.webp'
    ],
    '/services': [
        '/images/istanbul-airport-private-chauffeur-transfer.webp',
        '/images/private-chauffeur-hire-istanbul-transfer-mercedes-vito.webp',
        '/affiliates/can-duman-medical-tourism.webp',
        '/images/istanbul-city-tour-private-driver-galata-tower.webp',
    ],
    '/fleet': [
        '/vstars/vstars-fleet.webp',
        '/vstars/vstars-transfer-vehicle-vip-interior.webp',
    ],
    '/affiliates': [
        '/affiliates/vstars-transfer-affiliates.webp',
    ],
};

export default function sitemap(): MetadataRoute.Sitemap {
    return locales.flatMap((locale) =>
        paths.map((path) => ({
            url: `${BASE_URL}/${locale}${path}`,
            priority: path === '' ? 1.0 : 0.8,
            changeFrequency: 'monthly',
            images: imagesByPath[path]?.map(
                (img) => `${BASE_URL}${img}`
            ),
        }))
    );
}
