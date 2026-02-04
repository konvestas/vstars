import Image from "next/image";
import ServiceAccordion from "@/components/servicesPage/services-questions";
import {getServices} from "@/components/servicesPage/data/services-page-data";
import {useTranslations} from "next-intl";

export default function ServicesListSection() {
    const t = useTranslations("ServicesPage");
    const services = getServices(t);
    return (
        <section id="services-list" className="w-full py-16 md:py-24 bg-white dark:bg-zinc-950 font-sans transition-colors">
            <div className="space-y-32">
                {services.map((item, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div
                            key={item.title}
                            id={item.id}
                            className="scroll-mt-32 border-b border-gray-100 dark:border-zinc-900 pb-24 last:border-none last:pb-0"
                        >
                            {/* Service Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-16">

                                {/* Image Side */}
                                <div className={`relative w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl
                                    bg-gray-100 dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 group">
                                        <Image
                                            src={item.image}
                                            alt={item.alt}
                                            fill
                                            loading="eager"
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
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
                            <ServiceAccordion items={item.faqs} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}