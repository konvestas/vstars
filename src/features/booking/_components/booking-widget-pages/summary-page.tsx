import {useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";
import {motion} from "framer-motion";
import {format} from "date-fns";

export const StepSummary = ({ price, displayLocations }: { price: number, displayLocations: any }) => {
    const { watch } = useFormContext();
    const t = useTranslations('BookingWidget');
    const [serviceType, fullName, phone, date, time, passengers, luggage] = watch(["serviceType", "fullName", "phone", "date", "time", "passengers", "luggage"]);

    return (
        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white tracking-tight">{t("Summary.title")}</h3>
                <p className="text-sm text-white/60 mt-1">{t("Summary.desc")}</p>
            </div>
            <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider border-b border-white/10 pb-3">{t("Summary.bookingSummary")}</h4>
                    <div className="space-y-5 text-sm">
                        <div className="space-y-2 text-white/50">
                            <div>{t("Summary.serviceType")}<span className="text-white font-medium pl-1">{serviceType}</span></div>
                            <div>{t("Summary.guest")}<span className="text-white font-medium pl-1">{fullName}</span></div>
                            <div>{t("Summary.phone")}<span className="text-white font-medium pl-1">{phone}</span></div>
                            <div>{t("Summary.date")}<span className="text-white pl-1 font-medium">{date ? format(date, "dd MMM yyyy") : "-"} • {time}</span></div>
                        </div>
                        <div className="space-y-2 text-white/50">
                            <div className="text-white/70 font-semibold">{t("Summary.route")}</div>
                            <div>{t("Summary.pickUpAddress")}<span className="text-white font-medium pl-1 block">{displayLocations.pickup}</span></div>
                            <div>{t("Summary.dropOffAddress")}<span className="text-white font-medium pl-1 block">{displayLocations.dropoff}</span></div>
                        </div>
                        <div className="space-y-2 text-white/50">
                            <div>{t("Summary.passengers")}<span className="text-white font-medium pl-1">{passengers}</span></div>
                            <div>{t("Summary.bag")}<span className="text-white font-medium pl-1">{luggage}</span></div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-white/80">{t("Summary.total")}</span>
                        <span className="text-xl font-bold text-green-400">{price} TL</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
