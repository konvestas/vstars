"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceCardProps } from "@/components/homepage/data/homePage-services-section-data";

export function HomeServiceCard({ title, description, image, toServicesId, index, className }: ServiceCardProps) {
    const t = useTranslations("OurServices");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("h-full", className)}
        >
            <Link href={`/services#${toServicesId}`} className="block h-full group">
                <article
                    className={cn(
                        "flex flex-col h-full overflow-hidden rounded-2xl border transition-all duration-300",
                        "bg-white dark:bg-zinc-900",
                        "border-gray-100 dark:border-zinc-800",
                        "hover:shadow-xl hover:-translate-y-1 hover:border-gray-200 dark:hover:border-zinc-700"
                    )}
                >
                    {/* Image Container*/}
                    <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-gray-100 dark:bg-zinc-800">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            loading="eager"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
                            {title}
                        </h3>

                        <p className="text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed flex-1 mb-8">
                            {description}
                        </p>

                        {/* Footer / CTA */}
                        <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
                            <div className="inline-flex items-center text-sm font-semibold uppercase tracking-wider
                                text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                                <span>{t("see_more")}</span>
                                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}