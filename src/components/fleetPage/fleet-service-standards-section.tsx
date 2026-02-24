"use client";
import { motion } from "framer-motion";
import {getServiceStandards} from "@/components/fleetPage/data/fleetPage-service-standards-section-data";
import {useTranslations} from "next-intl";

export default function FleetServiceStandardsSection() {
    const t = useTranslations("FleetPage");
    const data = getServiceStandards(t);
    return (
        <section className="w-full py-16 bg-gray-50 border-t font-sans border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                <div className="mb-12 font-light">
                    <h2 className="text-3xl uppercase tracking-wide text-zinc-900 mb-4">
                        {t("servicesTitle")}
                    </h2>
                    <p className="text-gray-500 max-w-2xl text-lg ">
                        {t("servicesDesc")}
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex items-start gap-4 p-6 rounded-xl bg-white border border-gray-100
                                shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="shrink-0 mr-4 md:mr-0 md:mb-6
                                inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full
                                bg-linear-to-br from-orange-400 to-purple-700 text-white shadow-xl
                                 transition-transform duration-300 group-hover:scale-110">
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-normal text-zinc-900 mb-2">
                                        {feature.title}
                                    </h3>
                                        <p className="text-sm text-gray-600  leading-relaxed">
                                        {feature.description}
                                    </p>

                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}