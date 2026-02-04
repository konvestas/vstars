import React from 'react';
import { Metadata } from "next";
import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone } from 'lucide-react';
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import ContactForm from "@/components/contactPage/contact-form";
import {createPageMetadata} from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return createPageMetadata({
        locale,
        namespace: "ContactPageMetadata",
        path: "contact",
        image: "/vstars/vstars-fleet.webp",
    });
}

export default function ContactPage() {
    const t = useTranslations('ContactPage');
    const mapSrc = `https://maps.google.com/maps?q=40.884600538194476,29.20526621261032&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    // Local Business Schema for SEO
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.vstarstransfer.com",
        "name": "Vstars Transfer",
        "description": "Premium airport transfer and luxury chauffeur services in Istanbul",
        "url": "https://www.vstarstransfer.com",
        "telephone": "+905326432234",
        "email": "info@candumandanismanlik.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Kordonboyu Mh Ankara cad İSTMARİNA S2 kule B blok kat:24 no 147/B-300",
            "addressLocality": "Istanbul",
            "addressRegion": "Istanbul",
            "postalCode": "34860",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.884600538194476",
            "longitude": "29.20526621261032"
        },
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
        "priceRange": "$$-$$$",
        "image": "https://www.vstarstransfer.com/vstars/vstars-fleet.webp",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "17"
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar /></nav>

            <section className="pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-[1400px] mx-auto">

                    {/* --- HEADER (Luxury Style) --- */}
                    <div className="text-center mb-15 md:mb-20">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {t("description")}
                        </p>
                        {/* Decorative Separator Line */}
                        <div className="w-16 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mt-8"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                        {/* --- LEFT SIDE: Contact Info --- */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-light text-zinc-900 dark:text-white mb-6">
                                    {t("infoTitle")}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light text-lg">
                                    {t("infoDesc")}
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* Phone Item */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-zinc-900
                                                  group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shrink-0">
                                        <Phone className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">{t("phone")}</h4>
                                        <a href="tel:+905326432234" className="text-xl font-light text-zinc-900 dark:text-white hover:underline decoration-1 underline-offset-4">
                                            +90 532 643 22 34
                                        </a>
                                    </div>
                                </div>

                                {/* Email Item */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-zinc-900
                                                  group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shrink-0">
                                        <Mail className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">{t("email")}</h4>
                                        <a href="mailto:info@candumandanismanlik.com" className="text-xl font-light text-zinc-900 dark:text-white hover:underline decoration-1 underline-offset-4 break-all">
                                            info@candumandanismanlik.com
                                        </a>
                                    </div>
                                </div>

                                {/* Address Item */}
                                <div className="flex items-start gap-5 group">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-zinc-900
                                                  group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300 shrink-0">
                                        <MapPin className="w-5 h-5" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">{t("address")}</h4>
                                        <p className="text-lg font-light text-zinc-900 dark:text-white leading-relaxed">
                                            Kordonboyu Mh Ankara cad İSTMARİNA S2 kule B blok kat:24 no 147/B-300
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Container */}
                            <div className="w-full h-87.5 rounded-3xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm relative">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={mapSrc}
                                    title="Vstars Transfer Location"
                                    className="border-0 w-full h-full "
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=40.884600538194476,29.20526621261032`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-5 left-5 bg-white/90 dark:bg-black/90 backdrop-blur-md
                                             text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full
                                             shadow-lg hover:scale-105 transition-transform text-blue-700 dark:text-white z-10"
                                >
                                    {t("maps")}
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 lg:mt-0">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <FloatingWhatsApp />
            <footer><Footer /></footer>
        </main>
    );
}