"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    index: number;
    className?: string;
}

export function ServiceCard({ title, description, image, index, className }: ServiceCardProps) {
    const t = useTranslations("OurServices");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("h-full group", className)}
        >
            <Link href="/services" className="block h-full">
                <article
                    className={cn(
                        "flex flex-col h-full overflow-hidden rounded-xl border transition-all duration-300",
                        "bg-white border-gray-200 shadow-sm hover:shadow-xl",

                    )}
                >
                    {/* Image Container */}
                    <div className="relative h-50 sm:h-55 w-full shrink-0 overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            loading="eager"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Dark Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300 dark:bg-black/20" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                        <h3 className="text-xl font-semibold mb-3 leading-tight text-gray-900 dark:text-white">
                            {title}
                        </h3>

                        <p className="text-base leading-relaxed mb-6 flex-1 text-gray-600 dark:text-gray-400">
                            {description}
                        </p>

                        {/* Footer / CTA */}
                        <div
                            className={cn(
                                "pt-4 border-t flex items-center justify-between text-xs font-bold uppercase " +
                                "tracking-wider transition-colors border-gray-100 text-gray-400 group-hover:text-black",
                                "dark:border-white/10 dark:text-gray-500 dark:group-hover:text-white"
                            )}
                        >
                            <span>{t("see_more")}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}