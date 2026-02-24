"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {Carousel, CarouselContent, CarouselItem, type CarouselApi, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {getFleetSectionData, getFleetImages,} from "@/components/homepage/data/homePage-fleet-section-data";

export default function FleetDetailsSection() {
    const t = useTranslations("FleetPage");
    const specs = getFleetSectionData(t);

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
        <section className="w-full bg-white pb-16 md:pb-24 pt-7 text-zinc-900 font-sans">
            <div className="max-w-[1400px] mx-auto lg:px-12">

                {/* --- TOP SECTION: Carousel and Description Side-by-Side --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* LEFT COLUMN: Image Carousel */}
                    <div className="lg:col-span-7 w-full relative group rounded-2xl overflow-hidden bg-gray-50">
                        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
                            <CarouselContent>
                                {getFleetImages.map((src, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative w-full aspect-4/3 md:aspect-16/10">
                                            <Image
                                                src={src}
                                                alt={`Fleet view ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10
                           bg-white/80 hover:bg-white border-none shadow-sm
                           opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                            />
                            <CarouselNext
                                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10
                           bg-white/80 hover:bg-white border-none shadow-sm
                           opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                            />
                        </Carousel>

                        {/* Dots Indicator */}
                        {count > 1 && (
                            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 pointer-events-none">
                                {Array.from({ length: count }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1.5 rounded-full transition-all duration-300 shadow-sm",
                                            i === current
                                                ? "w-6 bg-white"
                                                : "w-1.5 bg-white/60"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Title & Description */}
                    <div className="lg:col-span-5 flex flex-col pt-4 font-light">
                        <h2 className="text-3xl uppercase tracking-wide mb-5 text-zinc-900">
                            {t("secondTitle")}
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-gray-700 ">
                            <p>
                                {t("secondDescription")}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10 mt-10 font-normal">
                        {specs.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-baseline border-b text-base border-gray-100 pb-4 md:border-none md:pb-0"
                            >

                                <dt className=" text-gray-500 min-w-[120px]">
                                    {item.title}
                                </dt>
                                <dd className="text-zinc-900 text-right md:text-left pl-8">
                                    {item.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

            </div>
        </section>
    );
}