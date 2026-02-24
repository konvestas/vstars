"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import {useTranslations} from "next-intl";

interface FAQItem {
    q: string;
    a: string;
}

export default function ServiceAccordion({ items }: { items: FAQItem[] }) {
    const t = useTranslations("ServicesPage");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white rounded-3xl p-8 md:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-8">
                {t("FAQS.title")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {items.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            onClick={() => toggleItem(index)}
                            className={cn(
                                "group cursor-pointer rounded-2xl border p-6 transition-all duration-300",
                                "hover:shadow-md",
                                isOpen
                                    ? "bg-white border-zinc-200  shadow-md"
                                    : "bg-transparent border-gray-200 "
                            )}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className={cn( "font-medium text-base transition-colors duration-300", isOpen ? "text-zinc-900" : "text-zinc-700 " )}>
                                    {faq.q}
                                </span>
                                <span className={cn(
                                    "shrink-0 transition-colors duration-300 ",
                                    isOpen ? "text-orange-400" : "text-orange-400"
                                )}>{isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </span>
                            </div>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pt-4 text-sm text-gray-500  leading-relaxed font-light">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}