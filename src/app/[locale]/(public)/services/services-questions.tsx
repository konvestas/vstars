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
        // Main Container: subtle border, clean background
        <div className="bg-white dark:bg-zinc-900 border border-border rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">

            {/* Decorative colored blur using Primary brand color */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-8 relative z-10">
                Frequently Asked Questions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start relative z-10">
                {items.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            onClick={() => toggleItem(index)}
                            className={cn(
                                "group cursor-pointer rounded-2xl border p-6 transition-all duration-300",
                                isOpen
                                    ? "bg-primary/5 border-primary/30 shadow-md" // Active: Brand Tint
                                    : "bg-white dark:bg-white/5 border-transparent dark:border-white/5 hover:border-primary/30" // Hover: Brand Border
                            )}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <span className={cn(
                                    "font-medium text-base transition-colors duration-300",
                                    isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                )}>
                                  {faq.q}
                                </span>

                                {/* Toggle Icon */}
                                <span className={cn(
                                    "shrink-0 transition-all duration-300 p-1 rounded-full",
                                    isOpen
                                        ? "bg-primary text-white rotate-0 shadow-sm" // Active: Solid Orange
                                        : "text-muted-foreground group-hover:text-primary rotate-90"
                                )}>
                                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                                        <p className="pt-4 text-sm text-muted-foreground leading-relaxed font-light">
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