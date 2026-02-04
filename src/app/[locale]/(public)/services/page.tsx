import { useTranslations } from "next-intl";
import NavigationBar from "@/components/layout/navigation-bar";
import ServicesListSection from "@/components/servicesPage/services-list-section";
import ReadyToBook from "@/components/layout/ready-to-book";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import {createPageMetadata} from "@/lib/metadata";
import type {Metadata} from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return createPageMetadata({
        locale,
        namespace: "ServicesMetadata",
        path: "services",
        image: "/vstars/vstars-fleet.webp",
    });
}

export default function ServicesPage() {
    const t = useTranslations("ServicesPage");

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 font-sans transition-colors">
            <nav className="fixed top-0 left-0 w-full z-50">
                <NavigationBar />
            </nav>

            <section className="pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-[1400px] mx-auto">

                    {/* --- HEADER --- */}
                    <div className="text-center mb-15 md:mb-20">
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {t("desc")}
                        </p>
                        <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800 mx-auto mt-8"></div>
                    </div>
                    <ServicesListSection/>
                    <ReadyToBook/>
                </div>
            </section>

            <footer><Footer/></footer>
            <FloatingWhatsApp/>
        </main>
    );
}