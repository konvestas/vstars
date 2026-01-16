"use client";

import Image from "next/image";
import { Lexend_Peta } from "next/font/google";
import { APIProvider } from "@vis.gl/react-google-maps";
import NavigationBar from "@/components/layout/navigation-bar";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import OurServicesSection from "@/components/layout/service-card-c";
import ScrollButton from "@/components/layout/scroll-button";
import BookingWidget from "@/app/[locale]/features/booking/_components/booking-widget";

const lexendPeta = Lexend_Peta({
    subsets: ["latin"],
    weight: "400"
});

export default function App() {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    return (
        <main className="relative">
            <nav className="fixed top-0 left-0 w-full z-50"><NavigationBar/></nav>

            <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-10 gap-8">
                {/* Background Image */}
                <div className="absolute inset-0 -z-20">
                    <Image
                        src="/images/d2Af.webp"
                        alt="Vstars transfer fleet"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 -z-10"></div>
                {/* Title */}
                <div className="w-full max-w-4xl px-4 z-10">
                    <h1 className={`${lexendPeta.className} text-white text-xl md:text-4xl font-bold tracking-widest uppercase drop-shadow-lg text-left`}>
                        Istanbul&#39;s <br/>Transfer Service
                    </h1>
                </div>
                {/* Widget */}
                <div className="z-10 w-full max-w-4xl -mt-8 "><APIProvider apiKey={API_KEY}><BookingWidget/></APIProvider></div>
                {/* Scroll Button */}
                <div className="z-10 mt-auto md:mt-8"><ScrollButton title="View our services" scrollTo="our-services"/></div>
            </section>

            <section className="w-full h-[50vh]"><OurServicesSection/></section>

            <FloatingWhatsApp/>
        </main>
    );
}