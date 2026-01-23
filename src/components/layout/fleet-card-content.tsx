"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { FleetCard } from "./fleet-card";
import {Carousel, CarouselContent, CarouselItem, type CarouselApi,} from "@/components/ui/carousel";

interface FleetItem {
    title: string;
    description: string;
    images: string[];
}

export default function FleetSection() {
    const t = useTranslations("Fleet");

    // Data Definition
    const fleetData: FleetItem[] = [
        {
            title: t("items.Vito.title"),
            description: t("items.Vito.desc"),
            images: [
                "/images/vstarsTransferVehicle.webp",
                "/images/vstarsTransferVehicleInside.webp",
                "/images/vstarsTransferVehicleOutside.webp",
            ],
        },
        {
            title: t("items.Sprinter.title"),
            description: t("items.Sprinter.desc"),
            images: [
                "/images/vstarsTransferVehicle.webp",
                "/images/vstarsTransferVehicleInside.webp",
                "/images/vstarsTransferVehicleOutside.webp"
            ],
        },
    ];

    // Carousel State (Mobile)
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section id="our-fleet" className="w-full py-20 md:py-24 bg-white dark:bg-black font-sans transition-colors">
            <div className="w-full mx-auto px-6 md:px-8">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-none text-gray-900 dark:text-white">
                        {t("sectionTitle")}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        {t("sectionDesc")}
                    </p>
                </div>

                {/* --- MOBILE VIEW (Carousel) --- */}
                <div className="block lg:hidden">
                    <Carousel
                        setApi={setApi}
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 items-stretch pb-4">
                            {fleetData.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-[85%] sm:basis-[60%] pl-4 h-auto"
                                >
                                    <FleetCard
                                        {...item}
                                        index={index}
                                        className="h-full"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Custom Dots */}
                    <div className="flex justify-center gap-1 mt-4">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className="flex h-11 w-11 items-center justify-center rounded-full
                                 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                <span
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300 block",
                                        index === current - 1
                                            ? "w-8 bg-gray-900 dark:bg-white"
                                            : "w-2 bg-gray-300 dark:bg-gray-700"
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- DESKTOP VIEW  */}
                <div className="hidden lg:flex lg:flex-wrap lg:justify-center lg:gap-6">
                    {fleetData.map((item, index) => (
                        <FleetCard
                            key={index}
                            {...item}
                            index={index}
                            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md"
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}