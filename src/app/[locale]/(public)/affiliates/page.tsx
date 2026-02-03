import React from 'react';
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";

import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import ReadyToBookSection from "@/components/layout/ready-to-book";
import { getAffiliatesInfo } from "@/components/affiliatesPage/data/affiliates-page-data";

export async function generateMetadata({ params, }: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "AffiliatesMetadata" });
    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `/${locale}/affiliates`,
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `https://www.vstarstransfer.com/${locale}/affiliates`,
            type: "website",
            images: [
                {
                    url: "https://www.vstarstransfer.com/images/vstars-fleet.webp",
                    width: 1920,
                    height: 1059,
                    alt: "Vstars Transfer luxury fleet in Istanbul",
                    type: "image/webp",
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: {
                url: "https://www.vstarstransfer.com/images/vstars-fleet.webp",
                alt: "Vstars Transfers luxury fleet in Istanbul",
                type: "image/webp",
            }
        },
    };
}

export default function AffiliatesPage() {
    const t = useTranslations('AffiliatesPage');
    const data = getAffiliatesInfo(t);

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 font-sans transition-colors">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar /></nav>

            <section className="pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-[1400px] mx-auto">

                    {/* --- HEADER (Luxury Style) --- */}
                    <div className="text-center mb-24 md:mb-32">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {t("desc")}
                        </p>
                        {/* Decorative Separator Line */}
                        <div className="w-16 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mt-8"></div>
                    </div>

                    {/* --- SERVICES GRID --- */}
                    <div className="space-y-24 md:space-y-32 mb-32">
                        {data.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={item.title} className="scroll-mt-32" id={item.id}>
                                    {/* Alternating Layout */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                                        {/* Image Side */}
                                        <div className={`relative w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl
                                                          bg-gray-100 dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 group">
                                                <Image
                                                    src={item.image}
                                                    alt={item.alt}
                                                    fill
                                                    loading="eager"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                />
                                                {/* Optional: Slight overlay to ensure image blends well */}
                                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-2xl pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Text Side */}
                                        <div className={`flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                            <h2 className="text-3xl font-light text-zinc-900 dark:text-white mb-6">
                                                {item.title}
                                            </h2>
                                            <p className="text-lg font-light text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <ReadyToBookSection/>
                <FloatingWhatsApp />
                <footer><Footer /></footer>
            </section>
        </main>
    );
}