"use client";

import Image from "next/image";
import dynamic from "next/dynamic"; // Import dynamic
import { APIProvider } from "@vis.gl/react-google-maps";
import NavigationBar from "@/components/layout/navigation-bar";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import ScrollButton from "@/components/layout/scroll-button";
import BookingWidget from "@/app/[locale]/features/booking/_components/booking-widget";
import Footer from "@/components/layout/footer";

// Lazy load below-the-fold sections
const OurServicesSection = dynamic(() => import("@/components/layout/service-card-content"), {
    loading: () => <div className="min-h-[50vh] flex items-center justify-center">Loading services...</div>
});
const FleetSection = dynamic(() => import("@/components/layout/fleet-card-content"), {
    loading: () => <div className="min-h-[50vh] flex items-center justify-center">Loading fleet...</div>
});

export default function App() {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    return (
        <main className="relative w-full">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar/></nav>

            <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-10 gap-8">
                {/* Background Image */}
                <div className="absolute inset-0 -z-20">
                    <Image
                        src="/images/vstarsFleet.webp"
                        alt="Vstars transfer fleet"
                        fill
                        className="object-cover object-center"
                        priority // Keep priority for LCP
                        sizes="100vw"
                        quality={85} // Slightly reduce quality for performance if needed
                    />
                </div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 -z-10"></div>
                {/* Title */}
                <div className=" max-w-4xl px-4 z-10">
                    <h1 className="font-lexend text-white text-xl md:text-4xl font-semilight tracking-widest uppercase drop-shadow-lg text-left">
                        Istanbul&#39;s <br/>Transfer Service
                    </h1>
                </div>
                {/* Widget */}
                <div className="z-10  max-w-4xl -mt-8 "><APIProvider apiKey={API_KEY}><BookingWidget/></APIProvider></div>
                <div className="z-10 mt-auto md:mt-8"><ScrollButton title="View our services" scrollTo="our-services"/></div>
            </section>

            {/* These sections are now lazy loaded */}
            <section className="min-h-1/2"><OurServicesSection/></section>
            <section className="min-h-1/2"><FleetSection/></section>

            <footer><Footer/></footer>
            <FloatingWhatsApp/>
        </main>
    );
}