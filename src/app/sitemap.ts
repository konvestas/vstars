import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.vstarstransfer.com';
const locales = ['en', 'tr', 'de', 'ru'];

const paths = [
    '',
    '/services',
    '/fleet',
    '/affiliates',
    '/contact',
    '/FAQ'
];

export default function sitemap(): MetadataRoute.Sitemap {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    paths.forEach((path) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${BASE_URL}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: path === '' ? 1.0 : 0.8,
            });
        });
    });

    return sitemapEntries;
}