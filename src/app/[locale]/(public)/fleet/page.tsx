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
                <div className="max-w-5xl mx-auto text-center pt-2 pb-6 md:pt-10 md:pb-8 font-sans">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {t("title")}
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {t("description")}
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-8 rounded-full opacity-80"></div>
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