import React from 'react';
import { getTranslations } from 'next-intl/server';
import {Metadata} from "next";
import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone } from 'lucide-react';
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import ContactForm from "@/components/contactPage/contact-form";

// 1. Generate Metadata for SEO
export async function generateMetadata({params,}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: "ContactPageMetadata"});
    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `/${locale}/contact`,
        },

        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `https://www.vstarstransfer.com/${locale}/contact`,
            type: "website",
        },

        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images:
                {
                    url: "https://www.vstarstransfer.com/images/vstars-fleet.webp",
                    alt: "Vstars Transfers luxury fleet in Istanbul",
                    type: "image/webp",
                }

        },
    };
}


export default function ContactPage() {
    const t = useTranslations('ContactPage');
    const mapSrc = `https://maps.google.com/maps?q=40.88461295159555,29.205337482484815&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-black">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar /></nav>

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                            {t("title")}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                            {t("description")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                        {/* Left Side: Contact Info */}
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">{t("infoTitle")}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                    {t("infoDesc")}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg">
                                        <Phone className="w-6 h-6 text-gray-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{t("phone")}</h4>
                                        <a href="tel:+905326432234" className="text-gray-600 dark:text-gray-400
                                         hover:text-green-600 transition-colors">
                                            +90 532 643 22 34
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg">
                                        <Mail className="w-6 h-6 text-gray-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{t("email")}</h4>
                                        <a href="mailto:info@candumandanismanlik.com" className="text-gray-600
                                        dark:text-gray-400 hover:text-blue-600 transition-colors">
                                            info@candumandanismanlik.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gray-100 dark:bg-white/10 rounded-lg">
                                        <MapPin className="w-6 h-6 text-gray-900 dark:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{t("address")}</h4>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Kordonboyu Mh Ankara cad İSTMARİNA S2 kule B blok kat:24 no 147/B-300
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="w-full h-87.5 rounded-2xl overflow-hidden border border-gray-200
                                 dark:border-white/10 shadow-lg relative bg-gray-100 dark:bg-zinc-800">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={mapSrc}
                                        title="Vstars Transfer Location"
                                        className="border-0 w-full h-full grayscale-20 hover:grayscale-0
                                        transition-all duration-500"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />

                                    {/* "Open in Maps" Button Overlay */}
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=40.8846129515955529.205337482484815`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 left-4 bg-white dark:bg-zinc-900 text-xs
                                        font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-transform
                                         text-black dark:text-white z-10"
                                    >
                                        {t("maps")}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div><ContactForm /></div>
                    </div>
                </div>
            </section>

            <FloatingWhatsApp />
            <footer><Footer /></footer>
        </main>
    );
}