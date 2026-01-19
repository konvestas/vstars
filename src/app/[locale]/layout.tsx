import type { Metadata } from "next";
import {Geist, Geist_Mono, Lexend_Peta} from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';
import "../globals.css";
import React from "react";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
    preload: true
});

const geistMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
    preload: true
});
const lexendPeta = Lexend_Peta({
    variable: "--font-lexend",
    subsets: ["latin"],
    display: "swap",
    preload: true
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        metadataBase: new URL('https://www.vstarstransfer.com'),
        title: t('title'),
        description: t('description'),
        applicationName: "Vstars Transfer",
        authors: [{ name: "Vstars Transfer & Onur Akgülay", url: "https://www.vstarstransfer.com/" }],
        keywords: t('keywords'),
        robots: "index, follow",
        alternates: {
            canonical: `/${locale}`,
            languages: {
                "en-US": "/en",
                "de-DE": "/de",
                "ru-RU": "/ru",
                "tr-TR": "/tr",
            }
        },
        icons: {
            icon: [
                { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
                { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
                { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
                { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
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
            url: `https://www.vstarstransfer.com/${locale}`,
            title: t('title'),
            description: t('description'),
            siteName: "Vstars Transfer",
            images: [
                {
                    url: "https://www.vstarstransfer.com/images/vstarsFleet.webp",
                    width: 1200,
                    height: 630,
                    alt: "Vstars Luxury Fleet",
                },
            ]
        },
        twitter: {
            card: "summary_large_image",
            site: "@vstarstransfer",
            creator: "@vstarstransfer",
            images: "https://www.vstarstransfer.com/images/vstarsFleet.webp"
        },
    };
}

export default async function RootLayout({
                                             children,
                                             params,
                                         }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    const messages = await getMessages();

    // Your Existing Schema Code
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Vstars Transfer",
        "image": "https://www.vstarstransfer.com/images/vstarsFleet.webp",
        "url": "https://www.vstarstransfer.com",
        "telephone": "+905326432234",
        "email": "info@candumandanismanlik.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Istanbul",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 40.88461295159555,
            "longitude": 29.205337482484815
        },
        "priceRange": "$$$",
        "areaServed": {
            "@type": "City",
            "name": "Istanbul"
        },
        "sameAs": [
            "https://www.instagram.com/vstarstransfer/",
            "https://www.facebook.com/vstarstransfer/"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Vstars Transfer Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Hourly and full day hire services",
                        "description": "Choose hourly or full-day service and enjoy comfortable, on-demand transportation tailored to your schedule."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Airport transfer services",
                        "description": "Reliable transfer service with on-time pick-ups, flight-tracking, and professional driver."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Medical tourism services",
                        "description": "Private, safe, and comfortable transport for medical tourism. Hospital visits and hotel transfers."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "City tour services",
                        "description": "Explore the city with a guide and customize your tour. Visit top attractions and historic landmarks."
                    }
                },
            ]
        }
    };

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} ${lexendPeta.variable} antialiased`}>
        <link rel="preconnect" href="https://maps.googleapis.com" />

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        <Toaster richColors position="top-center" closeButton />
        </body>
        </html>
    );
}