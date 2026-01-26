import React from "react";
import { getTranslations } from "next-intl/server";
import NavigationBar from "@/components/layout/navigation-bar";
import Footer from "@/components/layout/footer";
import FloatingWhatsApp from "@/components/layout/floating-whatsapp";
import Image from "next/image";
import ReadyToBookSection from "@/components/layout/ready-to-book";

export default function ServicesPage() {
    // const t = getTranslations('Services');
    const services = [
        {
            title: "Airport Transfers",
            description:
                "Reliable VIP transfer service with flight tracking, meet & greet, and professional chauffeurs. We ensure a seamless transition from the runway to the road, taking the stress out of your arrival.",
             image: "/images/istanbul-airport-private-chauffeur-transfer.webp",
        },
        {
            title: "Hourly Chauffeur Hire",
            description:
                "Full-day or hourly rental. Enjoy on-demand luxury transportation tailored to your personal schedule. Whether for business meetings or a shopping spree, your driver waits for you.",
            image: "/images/vstars-fleet.webp",
        },
        {
            title: "Medical Tourism",
            description:
                "Private, hygienic, and comfortable transport for medical guests. We provide direct transfers to hospitals and hotels with vehicles specifically prepared for post-procedure comfort.",
            image: "/images/can-duman-medical-tourism.webp",
        },
        {
            title: "City Tour",
            description:
                "Explore Istanbul with a private driver. Visit historical landmarks and top attractions at your own pace without the hassle of parking or navigating traffic.",
            image: "/images/istanbul-city-tour-private-driver-galata-tower.webp",
        },
    ];

    const faqs = [
        {
            q: "Do you provide meet & greet at the airport?",
            a: "Yes. Our chauffeurs meet you at arrivals with a personalized sign.",
        },
        {
            q: "Is flight tracking included?",
            a: "Absolutely. We track your flight and adjust pickup time accordingly.",
        },
        {
            q: "Can I book hourly with multiple stops?",
            a: "Yes. Hourly hire is ideal for multiple stops and flexible schedules.",
        },
        {
            q: "What if I need special assistance?",
            a: "Let us know during booking and we’ll prepare the vehicle accordingly.",
        },
    ];

    return (
        // Changed bg-gray-50 to bg-stone-50 for a warmer, more premium 'paper' feel
        <main className="min-h-screen pt-32 bg-white ">
            <nav className="fixed top-0 left-0 w-full z-50">
                <NavigationBar />
            </nav>

            <section className="w-full px-6 md:px-8">
                {/* Header Section */}
                <div className="max-w-5xl mx-auto text-center py-12 md:py-20">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                        World Class Services
                    </h1>
                    <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Experience premium chauffeur services designed for comfort, safety, and efficiency.
                    </p>
                    {/* Decorative small divider to add a touch of color */}
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-8 rounded-full opacity-80"></div>
                </div>

                {/* Services Section */}
                <div className="max-w-7xl mx-auto space-y-24 md:space-y-32 mb-32">
                    {services.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={item.title}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
                            >
                                {/* Image Side */}
                                <div className={`relative ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                    {/* Added a subtle shadow colored slightly amber to warm up the image */}
                                    <div className="aspect-4/3 relative overflow-hidden rounded-lg bg-gray-200
                                    dark:bg-gray-800 shadow-2xl shadow-stone-200 dark:shadow-none ring-1 ring-black/5">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
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
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto mt-20">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white text-center mb-12">
                        Frequently Asked Questions
                    </h1>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <details
                                key={faq.q}
                                className="group rounded-xl border bg-white border-gray-200 dark:border-white/10  dark:bg-white/5 p-6 open:shadow-lg open:shadow-stone-200/50 dark:open:shadow-none transition-all duration-300"
                            >
                                <summary className="flex cursor-pointeritems-center justify-between font-semibold text-lg text-gray-900 dark:text-white list-none select-none">
                                    {faq.q}
                                    {/* Changed arrow color to Amber for a nice detail */}
                                    <span className="ml-4 text-amber-600 transition-transform duration-300 group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                                </summary>
                                <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>

                <ReadyToBookSection/>
                <FloatingWhatsApp />
                <footer>
                    <Footer />
                </footer>
            </section>
        </main>
    );
}