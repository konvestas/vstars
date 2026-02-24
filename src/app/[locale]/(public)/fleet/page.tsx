import Footer from "@/components/layout/footer";
import ReadyToBook from "@/components/layout/ready-to-book";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import FleetDetailsSection from "@/components/fleetPage/FleetDetailsSection";
import FleetServiceStandardsSection from "@/components/fleetPage/fleet-service-standards-section";
import NavigationBar from "@/components/layout/navigation-bar";
import {useTranslations} from "next-intl";
import {createPageMetadata} from "@/lib/metadata";
import type { Metadata } from "next";
import {getVehicleSchemas} from "@/components/fleetPage/data/fleetPage-service-standards-section-data";

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
        <main className="min-h-screen pt-25 bg-white ">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(getVehicleSchemas) }}
                />
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar/></nav>

            <section className="w-full px-6 md:px-8 ">
                {/* --- HEADER --- */}
                <div className="text-center mb-6 md:mb-6">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900  mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        {t("description")}
                    </p>
                    <div className="w-12 md:w-16 h-[3px] bg-linear-to-br from-orange-400 to-purple-700 mx-auto mt-6 md:mt-8"/>
                </div>
                <FleetDetailsSection/>
                <FleetServiceStandardsSection/>
                <section className="min-h-1/2"><ReadyToBook/></section>
            </section>
            <FloatingWhatsApp />
            <footer><Footer/></footer>
        </main>
    );
}