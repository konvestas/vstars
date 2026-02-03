import Footer from "@/components/layout/footer";
import ReadyToBookSection from "@/components/layout/ready-to-book";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import FleetDetailsSection from "@/components/fleetPage/FleetDetailsSection";
import FleetServiceStandards from "@/components/fleetPage/fleet-service-standards-section";
import NavigationBar from "@/components/layout/navigation-bar";
import {useTranslations} from "next-intl";

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
                    <div className="w-16 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mt-8"></div>
                </div>

                <section className="min-h-1/2"><FleetDetailsSection/></section>
                <section className="min-h-1/2"><FleetServiceStandards/></section>
                <section className="min-h-1/2"><ReadyToBookSection/></section>
            </section>

            <FloatingWhatsApp />
            <footer><Footer/></footer>
        </main>
    );
}