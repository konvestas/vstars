import { useTranslations } from "next-intl";
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import ReadyToBook from "@/components/layout/ready-to-book";
import AffiliatesListSection from "@/components/affiliatesPage/affiliates-list-section";
import {createPageMetadata} from "@/lib/metadata";
import type {Metadata} from "next";
import {getAffiliatesInfoSchema} from "@/components/affiliatesPage/data/affiliates-page-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return createPageMetadata({
        locale,
        namespace: "AffiliatesMetadata",
        path: "affiliates",
        image: "/vstars/vstars-fleet.webp",
    });
}
export default function AffiliatesPage() {

    const t = useTranslations('AffiliatesPage');
    return (
        <main className="min-h-screen bg-white font-sans transition-colors">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getAffiliatesInfoSchema) }}
            />
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar /></nav>

            <section className="pt-32 pb-10 px-6 lg:px-8">
                <div className="max-w-[1400px] mx-auto">

                    <div className="text-center mb-15 md:mb-20">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900  mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-gray-500  max-w-2xl mx-auto font-light leading-relaxed">
                            {t("desc")}
                        </p>
                        <div className="w-16 md:w-16 h-[3px] bg-linear-to-br from-orange-400 to-purple-700 mx-auto mt-6 md:mt-8"/>
                    </div>
                    <AffiliatesListSection/>
                </div>
                <ReadyToBook/>
            </section>
            <FloatingWhatsApp />
            <footer><Footer /></footer>
        </main>
    );
}