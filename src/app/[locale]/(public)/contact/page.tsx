import React from 'react';
import { getTranslations } from 'next-intl/server';

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Fleet' });

    return {

    };
}

export default function ContactPage() {
    return (
        // 2. Add padding-top (pt-32) to prevent the fixed NavigationBar from covering content
        //    min-h-screen ensures the footer stays at the bottom on large screens
        <main className="min-h-screen pt-32 bg-gray-50 dark:bg-black">

        <span>Contact</span>

        </main>
    );
}