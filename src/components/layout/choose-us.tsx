"use client";

import React from "react";
import { ShieldCheck, Clock, Star, Headset } from "lucide-react";
import { motion, Variants } from "framer-motion";
import {useTranslations} from "next-intl";


export default function ChooseUs() {
    const t = useTranslations("ChooseUs");
    const highlights = [
        {
            title: t("highlights.0.title"),
            desc: t("highlights.0.desc"),
            icon: ShieldCheck,
        },
        {
            title: t("highlights.1.title"),
            desc: t("highlights.1.desc"),
            icon: Clock,
        },
        {
            title: t("highlights.2.title"),
            desc: t("highlights.2.desc"),
            icon: Star,
        },
        {
            title: t("highlights.3.title"),
            desc: t("highlights.3.desc"),
            icon: Headset,
        },
    ];

    const container: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
    };

    return (
        <section className="w-full py-20 md:py-24 bg-gray-50 dark:bg-black font-sans transition-colors">
            <div className="w-full mx-auto px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-semibold mb-4 leading-none text-gray-900 dark:text-white">
                        {t("section_title")}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        {t("section_desc")}
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {highlights.map((itemData) => {
                        const Icon = itemData.icon;
                        return (
                            <motion.article
                                key={itemData.title}
                                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm
                                 transition-all hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full
                                    bg-gray-900 text-white transition-colors group-hover:bg-black dark:bg-white
                                     dark:text-black">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {itemData.title}
                                    </h3>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    {itemData.desc}
                                </p>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}