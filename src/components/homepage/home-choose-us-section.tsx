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
        <section className="w-full py-16 md:py-24 bg-white font-sans">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* --- HEADER --- */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900  mb-4 md:mb-6">
                        {t("section_title")}
                    </h2>
                    <p className="text-base md:text-lg text-gray-500  max-w-2xl mx-auto font-light leading-relaxed">
                        {t("section_desc")}
                    </p>
                    <div className="w-12 md:w-16 h-[2px] bg-linear-to-br from-orange-400 to-purple-700 mx-auto mt-6 md:mt-8"></div>
                </div>

                {/* --- ADAPTIVE GRID --- */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 "
                >
                    {data.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group relative flex flex-row items-start text-left p-5 md:flex-col
                                md:items-center md:text-center md:p-8
                                rounded-2xl   bg-white hover:bg-white
                                hover:shadow-xl transition-all duration-300 "
                            >
                                {/* Icon Container */}
                                <div className="shrink-0 mr-4 md:mr-0 md:mb-6
                                inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full
                                bg-linear-to-br from-orange-400 to-purple-700 text-white shadow-sm
                                 transition-transform duration-300 group-hover:scale-110">
                                    <Icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-light ">
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