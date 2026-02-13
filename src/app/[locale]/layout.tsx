import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Peta } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations } from 'next-intl/server';
import "../globals.css";
import React from "react";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

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
            url: `https://www.vstarstransfer.com/${locale}`,
            emails: "info@candumandanismanlik.com",
            phoneNumbers: "+90 5326432234",
            locale: locale,
            countryName: "Türkiye",
            title: t('title'),
            description: t('description'),
            siteName: "Vstars Transfer",
            images: [
                {
                    url: "https://www.vstarstransfer.com/images/istanbul-15-Temmuz-bridge-view-scenery.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Scenery view from the 15 Temmuz bridge of Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/images/istanbul-airport-private-chauffeur-transfer.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Airport private chauffeur transfer with Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/images/istanbul-airport-vip-transfer-mercedes-vito.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Airport vip transfer with Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/images/istanbul-city-tour-private-driver-galata-tower.webp",
                    width: 1200,
                    height: 800,
                    alt: "City tour with private driver in Istanbul with a view to galata tower",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/images/istanbul-hourly-hire-private-driver.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Hourly hire for Vstars transfers in Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/affiliates/can-duman-medical-tourism.webp",
                    width: 800,
                    height: 600,
                    alt: "One of the affiliates of Vstars Transfer for medical tourism in Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/images/private-chauffeur-hire-istanbul-transfer-mercedes-vito.webp",
                    width: 1500,
                    height: 1500,
                    alt: "Private chauffeur hire for Vstars transfers in Istanbul",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/vstars/vstars-fleet.webp",
                    width: 1920,
                    height: 1059,
                    alt: "Vstars transfers fleet with a view to the Bosporus",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/vstars/vstars-transfer-vehicle-vip-interior.webp",
                    width: 800,
                    height: 450,
                    alt: "Inside view for the Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/vstars/vstars-transfer-vehicle-inside-reverse-view.webp",
                    width: 800,
                    height: 450,
                    alt: "Inside view for the Mercedes-Benz Maybach van",
                    type: "image/webp"
                },
                {
                    url: "https://www.vstarstransfer.com/vstars/vstars-transfer-vehicle-outside-view.webp",
                    width: 600,
                    height: 600,
                    alt: "Mercedes-Benz Maybach van outside view",
                    type: "image/webp"
                },
            ]
        },
        twitter: {
            site: `https://www.vstarstransfer.com/${locale}/services`,
            creator: "Vstars Transfer & Onur Akgülay",
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: {
                url: "https://www.vstarstransfer.com/vstars/vstars-fleet.webp",
                width: 1920,
                height: 1059,
                alt: "Vstars transfers fleet with a view to the Bosporus",
                type: "image/webp"
            },
        },
        assets: [
            "https://www.vstarstransfer.com/vstars",
            "https://www.vstarstransfer.com/affiliates",
            "https://www.vstarstransfer.com/images",
        ]
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

    // Organization Schema for Root Layout
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.vstarstransfer.com/#localbusiness",
        "name": "Vstars Transfer",
        "image": "https://www.vstarstransfer.com/vstars/vstars-fleet.webp",
        "url": "https://www.vstarstransfer.com",
        "telephone": "+905326432234",
        "email": "info@candumandanismanlik.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kordonboyu Mh Ankara cad İSTMARİNA S2 kule B blok kat:24 no 147/B-300",
            "addressLocality": "Istanbul",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.88461295159555",
            "longitude": "29.205337482484815"
        },
        "priceRange": "$$$",
        "currenciesAccepted": "TRY, USD, EUR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Istanbul"
            },
            {
                "@type": "Airport",
                "name": "Istanbul Airport",
                "iataCode": "IST"
            },
            {
                "@type": "Airport",
                "name": "Sabiha Gökçen International Airport",
                "iataCode": "SAW"
            }
        ],
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
                        "description": "Choose hourly or full-day service and enjoy comfortable, on-demand transportation tailored to your schedule.",
                        "provider": {
                            "@id": "https://www.vstarstransfer.com/#localbusiness"
                        }
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Airport transfer services",
                        "description": "Reliable transfer service with on-time pick-ups, flight-tracking, and professional driver.",
                        "provider": {
                            "@id": "https://www.vstarstransfer.com/#localbusiness"
                        },
                        "areaServed": [
                            {
                                "@type": "Airport",
                                "name": "Istanbul Airport",
                                "iataCode": "IST"
                            },
                            {
                                "@type": "Airport",
                                "name": "Sabiha Gökçen International Airport",
                                "iataCode": "SAW"
                            }
                        ]
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Medical tourism services",
                        "description": "Private, safe, and comfortable transport for medical tourism. Hospital visits and hotel transfers.",
                        "provider": {
                            "@id": "https://www.vstarstransfer.com/#localbusiness"
                        }
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "City tour services",
                        "description": "Explore the city with a guide and customize your tour. Visit top attractions and historic landmarks.",
                        "provider": {
                            "@id": "https://www.vstarstransfer.com/#localbusiness"
                        }
                    }
                }
            ]
        }
    };

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="preconnect" href="https://maps.googleapis.com" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} ${lexendPeta.variable} antialiased`}>
        <Script id="passive-events" strategy="beforeInteractive">
            {`
                        (function() {
                            const o = EventTarget.prototype.addEventListener;
                            EventTarget.prototype.addEventListener = function(t, l, opt) {
                                const touch = ['touchstart','touchmove','touchend','wheel','mousewheel'].includes(t);
                                if (touch && typeof opt !== 'object') opt = { passive: true, capture: typeof opt === 'boolean' ? opt : false };
                                else if (touch && typeof opt === 'object' && opt.passive === undefined) opt.passive = true;
                                return o.call(this, t, l, opt);
                            };
                        })();
                    `}
        </Script>

        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>

        <Toaster
            theme="light"
            richColors={true}
            duration={5000}
            position="top-center"
            closeButton
        />
        </body>
        </html>
    );
}