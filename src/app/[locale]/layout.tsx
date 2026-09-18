import type {Metadata, Viewport} from "next";
import { Geist, Geist_Mono, Lexend_Peta } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import React from "react";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import {CookieConsentProvider} from "@/features/cookie-consent/cookie-consent-context";
import CookieConsentBanner from "@/features/cookie-consent/cookie-consent-banner";
import FirebaseAnalytics from "@/components/layout/FirebaseAnalytics";
import Script from "next/script";
import {buildJsonLd} from "@/lib/seo/json-ld";
import {mainMetadata} from "@/lib/seo/mainMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    return mainMetadata({ params });
}

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
    preload: false
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "auto",
    interactiveWidget: "resizes-content"
};

export default async function RootLayout({ children, params }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    const messages = await getMessages();

    // Organization Schema for Root Layout
    const jsonLd = buildJsonLd(locale);

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
            <link rel="preconnect" href="https://maps.googleapis.com" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} ${lexendPeta.variable} antialiased`}>
        <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CookieConsentProvider>
            <NextIntlClientProvider messages={messages}>
                {children}
                <CookieConsentBanner />
                <FirebaseAnalytics />
            </NextIntlClientProvider>
        </CookieConsentProvider>

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