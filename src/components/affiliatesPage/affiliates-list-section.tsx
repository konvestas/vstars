import { useTranslations } from "next-intl";

import { getAffiliatesInfo } from "@/components/affiliatesPage/data/affiliates-page-data";
import Image from "next/image";


export default function AffiliatesListSection() {
    const t = useTranslations('AffiliatesPage');
    const data = getAffiliatesInfo(t);

    return (
            <div className="space-y-24 md:space-y-32 mb-32">
                {data.map((item, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={item.title} className="scroll-mt-32" id={item.id}>
                            {/* Alternating Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                                {/* Image Side */}
                                <div className={`relative w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl
                                                          bg-gray-100 dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 group">
                                        <Image
                                            src={item.image}
                                            alt={item.alt}
                                            fill
                                            loading="eager"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        {/* Optional: Slight overlay to ensure image blends well */}
                                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-2xl pointer-events-none" />
                                    </div>
                                </div>

                                {/* Text Side */}
                                <div className={`flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                    <h2 className="text-3xl font-light text-zinc-900 dark:text-white mb-6">
                                        {item.title}
                                    </h2>
                                    <p className="text-lg font-light text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
    );
}