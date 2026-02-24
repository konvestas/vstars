"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FleetCardProps } from "@/components/homepage/data/home-fleet-data";

export function FleetCard({ title, description, images, index, className }: FleetCardProps) {
    const t = useTranslations("Fleet");
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    // Split description by new line to create list items
    const features = description.split('\n').filter(line => line.trim() !== '');

    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollPrev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        api?.scrollPrev();
    };

    const scrollNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        api?.scrollNext();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("h-full group", className)}
        >
            <div  className={cn(
                " block h-full  flex-col overflow-hidden rounded-xl " +
                "border transition-all duration-300",
                "bg-white border-gray-300 shadow-sm hover:shadow-xl"
            )}>
                {/* Image Carousel Container */}
                <div className="relative h-55 w-full shrink-0 overflow-hidden bg-gray-100">
                    <Carousel setApi={setApi} opts={{ loop: true }} className="w-full h-full">
                        <CarouselContent className="h-full">
                            {images.map((image, i) => (
                                <CarouselItem key={i} className="h-full">
                                    <div className="relative h-55 w-full">
                                        <Image
                                            src={image}
                                            alt={`${title} - Image ${i + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full
                                bg-white/90 0 border-0 shadow-lg hover:bg-white  z-10"
                                onClick={scrollPrev}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8
                                rounded-full bg-white/90 border-0 shadow-lg hover:bg-white  z-10"
                                onClick={scrollNext}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                    {/* Dots Indicator */}
                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
                            {images.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        i === current
                                            ? "w-6 bg-white"
                                            : "w-2.5 bg-white/50"
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}

                <Link href="/fleet" className="flex flex-col flex-1">
                    <div className="flex flex-col p-6">
                        {/* Title */}
                        <h3 className="text-2xl font-semibold mb-4  text-gray-700">
                            {title}
                        </h3>


                        {/* Feature List */}
                        <ul className="space-y-3 mb-6 flex-1">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="mt-1 flex items-center justify-center w-5 h-5
                                    rounded-full text-purple-700 shadow-sm transition-all duration-300 group-hover:scale-105">
                                        <Check className="h-3 w-3" strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">
                                        {feature.replace(/^[•\-*]\s*/, '')}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Separator
                            orientation="horizontal"
                            decorative={true}
                            className=" bg-linear-to-r from-purple-700 to-orange-400 mb-5 "
                        />
                        {/* Footer / CTA */}
                        <div
                            aria-label="See more about our fleet"
                            className="pt-2 flex text-xs font-semibold uppercase tracking-wider
                            text-orange-500 group-hover:text-orange-600"
                        >
                            <span>{t("seeMore")}</span>
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            </div>

        </motion.div>
    );
}