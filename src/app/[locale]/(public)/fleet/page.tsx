import Footer from "@/components/layout/footer";
import ReadyToBook from "@/components/layout/ready-to-book";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import FleetDetailsSection from "@/components/fleetPage/FleetDetailsSection";
import FleetServiceStandardsSection from "@/components/fleetPage/fleet-service-standards-section";
import NavigationBar from "@/components/layout/navigation-bar";
import {useTranslations} from "next-intl";
import {createPageMetadata} from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return createPageMetadata({
        locale,
        namespace: "FleetMetadata",
        path: "fleet",
        image: "/vstars/vstars-fleet.webp",
    });
}

export default function FleetPage() {
    const t = useTranslations('FleetPage');
    return (
        <main className="min-h-screen pt-20 bg-white ">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar/></nav>

            <section className="w-full px-6 md:px-8">
                {/* --- HEADER --- */}
                <div className="text-center mb-24 md:mb-32">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t("description")}
                    </p>
                    <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800 mx-auto mt-8"></div>
                </div>
            </section>

            <FleetDetailsSection/>
            <FleetServiceStandardsSection/>
            <section className="min-h-1/2"><ReadyToBook/></section>

            <FloatingWhatsApp />
            <footer><Footer/></footer>
        </main>
    );
}