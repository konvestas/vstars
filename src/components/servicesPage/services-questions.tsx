"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
    q: string;
    a: string;
}

export default function ServiceAccordion({ items }: { items: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-50 dark:bg-zinc-900/30 rounded-3xl p-8 md:p-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-8">
                Frequently Asked Questions
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
                                    ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 shadow-md"
                                    : "bg-transparent border-gray-200 dark:border-zinc-800"
                            )}
                        >
                            <div className="flex items-center justify-between gap-4">
                <span className={cn(
                    "font-medium text-base transition-colors duration-300",
                    isOpen ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300"
                )}>
                  {faq.q}
                </span>
                                <span className={cn(
                                    "shrink-0 transition-colors duration-300",
                                    isOpen ? "text-zinc-900 dark:text-white" : "text-gray-400"
                                )}>
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
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
                                        <p className="pt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
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