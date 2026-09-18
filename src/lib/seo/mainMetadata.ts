import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function mainMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta-data' });

    return {
        metadataBase: new URL('https://www.vstars.com.tr'),
        title: t('title'),
        description: t('description'),
        applicationName: "Vstars Transfer",
        authors: [{ name: "Vstars Transfer & Onur Akgülay", url: "https://www.vstars.com.tr/" }],
        keywords: t('keywords'),
        robots: "index, follow",
        referrer: "strict-origin-when-cross-origin",
        creator: "Vstars Transfer & Onur Akgülay",
        publisher: "Vstars Transfer",
        alternates: {
            canonical: `/${locale}`,
            languages: {
                "en-US": `/en`,
                "de-DE": `/de`,
                "ru-RU": `/ru`,
                "tr-TR": `/tr`,
            },
        },
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
                { url: "/logo-icon-192x192.png", sizes: "192x192", type: "image/png" },
                { url: "/logo-icon-512x512.png", sizes: "512x512", type: "image/png" },
            ],
            apple: [
                { url: "/apple-icon-57x57.png", sizes: "57x57" },
                { url: "/apple-icon-60x60.png", sizes: "60x60" },
                { url: "/apple-icon-72x72.png", sizes: "72x72" },
                { url: "/apple-icon-76x76.png", sizes: "76x76" },
                { url: "/apple-icon-114x114.png", sizes: "114x114" },
                { url: "/apple-icon-120x120.png", sizes: "120x120" },
                { url: "/apple-icon-144x144.png", sizes: "144x144" },
                { url: "/apple-icon-152x152.png", sizes: "152x152" },
                { url: "/apple-icon-180x180.png", sizes: "180x180" },
            ],
            shortcut: "/favicon.ico",
        },
        manifest: "/manifest.webmanifest",
        openGraph: {
            type: "website",
            url: `https://www.vstars.com.tr/${locale}`,
            emails: "vstarstransfer34@gmail.com",
            phoneNumbers: "+90 5326432234",
            locale: locale,
            alternateLocale: ["en-US", "de-DE", "ru-RU", "tr-TR", "es-ES"],
            countryName: "Türkiye",
            title: t('title'),
            description: t('description'),
            siteName: "Vstars Transfer",
            images: [
                {
                    url: "https://www.vstars.com.tr/images/istanbul-15-Temmuz-bridge-view-scenery.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Scenery view from the 15 Temmuz bridge of Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/images/istanbul-airport-private-chauffeur-transfer.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Airport private chauffeur transfer with Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/images/istanbul-airport-vip-transfer-mercedes-vito.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Airport vip transfer with Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/images/istanbul-city-tour-private-driver-galata-tower.webp",
                    width: 1200,
                    height: 800,
                    alt: "City tour with private driver in Istanbul with a view to galata tower",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/images/istanbul-hourly-hire-private-driver.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Hourly hire for Vstars transfers in Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/affiliates/can-duman-medical-tourism.webp",
                    width: 800,
                    height: 600,
                    alt: "One of the affiliates of Vstars Transfer for medical tourism in Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/images/private-chauffeur-hire-istanbul-transfer-mercedes-vito.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Private chauffeur hire for Vstars transfers in Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/vstars/vstars-fleet.webp",
                    width: 1920,
                    height: 1059,
                    alt: "Vstars transfers fleet with a view to the Bosporus",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/vstars/vstars-transfer-vehicle-vip-interior.webp",
                    width: 800,
                    height: 450,
                    alt: "Inside view for the Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/vstars/vstars-transfer-vehicle-inside-reverse-view.webp",
                    width: 800,
                    height: 450,
                    alt: "Inside view for the Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstars.com.tr/vstars/vstars-transfer-vehicle-outside-view.webp",
                    width: 600,
                    height: 600,
                    alt: "Mercedes-Benz Maybach van outside view",
                    type: "image/webp"
                },
            ]
        },
        twitter: {
            site: `https://www.vstars.com.tr/${locale}/services`,
            creator: "Vstars Transfer & Onur Akgülay",
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: {
                url: "https://www.vstars.com.tr/vstars/vstars-fleet.webp",
                width: 1920,
                height: 1059,
                alt: "Vstars transfers fleet with a view to the Bosporus",
                type: "image/webp"
            },
        }
    };
}
