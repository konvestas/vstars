"use client";

import { useTranslations } from "next-intl";
import { FleetCard } from "./fleet-card";
import { getHomeFleetData } from "@/components/homepage/data/home-fleet-data";

export default function FleetSection() {
    const t = useTranslations("Fleet");
    const data = getHomeFleetData(t);

    return (
        <section id="our-fleet" className="w-full py-20 md:py-24 bg-white dark:bg-black font-sans transition-colors">
            <div className="w-full mx-auto px-6 md:px-8">

                {/* HEADER */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white mb-4 md:mb-6">
                        {t("sectionTitle")}
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t("sectionDesc")}
                    </p>
                    <div className="w-12 md:w-16 h-px bg-zinc-200 dark:bg-zinc-800 mx-auto mt-6 md:mt-8"></div>
                </div>

                <div className="flex flex-col items-center justify-center gap-12 md:gap-16">
                    {data.map((item, index) => (
                        <FleetCard
                            key={index}
                            {...item}
                            index={index}
                            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-18px)] max-w-md"
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}