import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getHomeChooseUsData } from "@/components/homepage/data/homePage-chooseUs-section-data";

export default function HomeChooseUsSection() {
    const t = useTranslations("ChooseUs");
    const data = getHomeChooseUsData(t);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="w-full py-16 md:py-24 bg-white dark:bg-zinc-950 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- HEADER --- */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 dark:text-white mb-4 md:mb-6">
                        {t("section_title")}
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        {t("section_desc")}
                    </p>
                    <div className="w-12 md:w-16 h-[1px] bg-zinc-200 dark:bg-zinc-800 mx-auto mt-6 md:mt-8"></div>
                </div>

                {/* --- ADAPTIVE GRID --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
                >
                    {data.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group relative flex
                           /* MOBILE STYLES: Row layout (Icon Left), smaller padding */
                           flex-row items-start text-left p-5
                           /* DESKTOP STYLES: Column layout (Icon Top), larger padding */
                           md:flex-col md:items-center md:text-center md:p-8

                           rounded-2xl border border-transparent
                           bg-gray-50 hover:bg-white hover:border-zinc-100 hover:shadow-xl
                           dark:bg-white/5 dark:hover:bg-zinc-900 dark:hover:border-zinc-800
                           transition-all duration-300"
                            >
                                {/* Icon Container */}
                                <div className="shrink-0 mr-4 md:mr-0 md:mb-6
                                inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full
                                bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm
                                group-hover:bg-zinc-900 group-hover:text-white
                                transition-colors duration-300">
                                    <Icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}