import React from 'react';
import { getTranslations } from 'next-intl/server';
import NavigationBar from "@/components/layout/navigation-bar";

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Fleet' });

    return {

    };
}

export default function FAQPage() {
    return (
        // 2. Add padding-top (pt-32) to prevent the fixed NavigationBar from covering content
        //    min-h-screen ensures the footer stays at the bottom on large screens
        <main className="min-h-screen pt-32 bg-gray-50 dark:bg-black">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar/></nav>

            <section>
                <div>
                    FAQ
                </div>
            </section>

        </main>
    );
}