import React from 'react';
import { getTranslations } from 'next-intl/server';
import OurServicesSection from '@/components/layout/service-card-content';

// 1. Generate Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'OurServices' });

    return {

    };
}

export default function ServicesPage() {
    return (
        // 2. Add padding-top (pt-32) to prevent the fixed NavigationBar from covering content
        //    min-h-screen ensures the footer stays at the bottom on large screens
        <main className="min-h-screen pt-32 bg-gray-50 dark:bg-black">

            {/* Optional: You can add a simple text header here if you want
                something different from the component's default header */}

            {/* 3. Reuse your existing Services Section */}
            <OurServicesSection />

        </main>
    );
}