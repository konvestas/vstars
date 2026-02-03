"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { HomeServiceCard } from "./home-service-card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { getHomeServicesData } from "@/components/homepage/data/homePage-services-section-data";

export default function HomeServicesSection() {
    const t = useTranslations("OurServices");
    const services = getHomeServicesData(t);

    // Carousel State (Mobile)
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section id="our-services" className="w-full py-16 md:py-24 bg-white dark:bg-zinc-950 font-sans transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- HEADER (Matches Fleet Section) --- */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white mb-4 md:mb-6">
                        {t("section_title")}
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t("section_desc")}
                    </p>
                    {/* Decorative Separator Line */}
                    <div className="w-12 md:w-16 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mt-6 md:mt-8"></div>
                </div>

                {/* --- MOBILE VIEW (Carousel) --- */}
                <div className="block lg:hidden">
                    <Carousel
                        setApi={setApi}
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 pb-6">
                            {services.map((service, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-[85%] sm:basis-[60%] pl-4 h-auto"
                                >
                                    <HomeServiceCard
                                        {...service}
                                        index={index}
                                        className="h-full"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Dots Indicator (Dash Style) */}
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className="group relative flex h-3 w-3 items-center justify-center"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <span
                                    className={cn(
                                        "rounded-full transition-all duration-500",
                                        index === current
                                            ? "h-1.5 w-6 bg-zinc-900 dark:bg-white" // Active
                                            : "h-1.5 w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400" // Inactive
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- DESKTOP VIEW (Grid) --- */}
                <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <HomeServiceCard
                            key={index}
                            {...service}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}