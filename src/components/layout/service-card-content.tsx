"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ServiceCard } from "./service-card";
import {Carousel, CarouselContent, CarouselItem, type CarouselApi,} from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface ServiceItem {
    title: string;
    description: string;
    image: string;
}

export default function OurServicesSection() {
    const t = useTranslations("OurServices");

    // Data Definition
    const servicesData: ServiceItem[] = [
        {
            title: t("items.hourlyHire.title"),
            description: t("items.hourlyHire.desc"),
            image: "/images/vstarsTransferVehicle.webp",
        },
        {
            title: t("items.airportTransfers.title"),
            description: t("items.airportTransfers.desc"),
            image: "/images/vstarsTransferVehicleOutside.webp",
        },
        {
            title: t("items.medicalTourism.title"),
            description: t("items.medicalTourism.desc"),
            image: "/images/vstarsTransferVehicleInside.webp",
        },
        {
            title: t("items.cityTour.title"),
            description: t("items.cityTour.desc"),
            image: "/images/istanbul.webp",
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
        <section id="our-services" className="w-full py-20 md:py-24 bg-white dark:bg-black font-sans transition-colors">
            <div className="w-full mx-auto px-6 md:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                {/* HEADER */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-none text-gray-900 dark:text-white">
                        {t("section_title")}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        {t("section_desc")}
                    </p>
                </div>
                </motion.div>

                {/* --- MOBILE VIEW (Carousel) --- */}
                <div className="block lg:hidden">
                    <Carousel
                        setApi={setApi}
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4 items-stretch pb-4">
                            {servicesData.map((service, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-[85%] sm:basis-[60%] pl-4 h-auto"
                                >
                                    <ServiceCard
                                        {...service}
                                        index={index}
                                        className="h-full"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Custom Dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    index === current - 1
                                        ? "w-8 bg-gray-900 dark:bg-white"
                                        : "w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                                )}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* --- DESKTOP VIEW (Grid) --- */}
                <div className="hidden lg:grid grid-cols-4 gap-6">
                    {servicesData.map((service, index) => (
                        <ServiceCard
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