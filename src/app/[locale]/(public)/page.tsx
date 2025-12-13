"use client";

import Image from "next/image";
import { APIProvider } from "@vis.gl/react-google-maps";
import NavigationBar from "@/components/layout/navigation-bar";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import OurServicesSection from "@/components/layout/service-card-c";
import ScrollButton from "@/components/layout/scroll-button";
import BookingWidget from "@/app/[locale]/features/booking/_components/booking-widget";

export default function App() {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

    return (
        <main>
            <NavigationBar/>

            <section className="w-full h-[100vh]">
                <Image
                    src="/images/d2.png"
                    alt="Vstars transfer fleet with Bosphorus bridge view"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/40"></div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white
                    tracking-wide drop-shadow-2xl whitespace-nowrap w-full text-center lg:text-left mt-3">
                        Istanbul&#39;s Transfer Service
                    </h1>
                    <APIProvider apiKey={API_KEY}><BookingWidget/></APIProvider>
                    <ScrollButton title="View our services" scrollTo="our-services"/>
                </section>

                <section className="w-full h-[50vh]">
                    <OurServicesSection/>
                </section>

                <FloatingWhatsApp/>
            </main>
    );
}