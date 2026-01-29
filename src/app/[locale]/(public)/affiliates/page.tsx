import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import Image from "next/image";
import ReadyToBookSection from "@/components/layout/ready-to-book";
import {useTranslations} from "next-intl";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import {getAffiliatesInfo} from "@/components/affiliatesPage/data/affiliates-page-data";

export async function generateMetadata({params,}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({locale, namespace: "AffiliatesMetadata"});
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
            images:
                {
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
        <main className="min-h-screen pt-20 bg-white ">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar /></nav>

            <section className="w-full px-6 md:px-8">
                {/* Header Section */}
                <div className="max-w-5xl mx-auto text-center pt-2 pb-12 md:pt-10 md:pb-20">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {t("title")}
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {t("desc")}
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-8 rounded-full opacity-80"></div>
                </div>

                {/* Services Section */}
                <div className="max-w-7xl mx-auto space-y-24 md:space-y-32 mb-32">
                    {data.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={item.title} className="space-y-8 scroll-mt-25" id={item.id}>
                                {/* Image and Text Section */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                                    <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"} w-full`}>
                                        <div className="aspect-4/3 relative overflow-hidden rounded-lg bg-gray-200
                                        dark:bg-gray-800 shadow-2xl shadow-stone-200 dark:shadow-none ring-1 ring-black/5">
                                            <Image
                                                src={item.image}
                                                alt={item.alt}
                                                fill
                                                loading="eager"
                                                className="object-cover transition-transform duration-700 "
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>

                                    {/* Text Side */}
                                    <div className={`flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                            {item.title}
                                        </h2>
                                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <ReadyToBookSection/>
                <FloatingWhatsApp />
                <footer><Footer /></footer>
            </section>
        </main>
    );
}