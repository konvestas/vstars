import {useLocale, useTranslations} from "next-intl";
import {motion} from "framer-motion";
import {AlertCircle, Calendar, Check, Info} from "lucide-react";
import {format} from "date-fns";
import {StepVehicleProps} from "@/features/booking/_components/booking-widget-pages/data/vehicle-page-data";
import type { Locale } from "react-day-picker";
import { tr as trDateFns, de as deDateFns, ru as ruDateFns, enUS as enUSDateFns } from "date-fns/locale";


export const StepVehicle = ({ displayLocations, date, time }: StepVehicleProps) => {
    const t = useTranslations('BookingWidget');
    const locale = useLocale();
    const dateFnsLocaleMap: Record<string, Locale> = {
        tr: trDateFns,
        de: deDateFns,
        ru: ruDateFns,
        en: enUSDateFns,
    };
    const dateFnsLocale = dateFnsLocaleMap[locale] || enUSDateFns;
    return (
        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-3 space-y-1">
                <div className="flex items-center gap-3 text-white/90">
                    <Calendar className="h-4 w-4 text-green-400 shrink-0" />
                    <span className="text-sm font-medium">{date ? format(date, "EEEE, dd MMMM yyyy", { locale: dateFnsLocale }) : "Date"} • {time}</span>
                </div>
                <div className="flex flex-col gap-3 relative">
                    <div className="absolute left-1.75 top-2 bottom-5 w-0.5 bg-white/20" />
                    <div className="flex items-start gap-3 z-10">
                        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black/50 shrink-0 mt-0.5" />
                        <div className="flex flex-col">
                            <span className="text-xs text-white/50 uppercase">{t("Form.pickUpLocation")}</span>
                            <span className="text-sm text-white font-medium line-clamp-1">{displayLocations.pickup}</span>
                        </div>
                    </div>
                    {displayLocations.dropoff && (
                        <div className="flex items-start gap-3 z-10">
                            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-black/50 shrink-0 mt-0.5" />
                            <div className="flex flex-col">
                                <span className="text-xs text-white/50 uppercase">{t("Form.dropOffLocation")}</span>
                                <span className="text-sm text-white font-medium line-clamp-1">{displayLocations.dropoff}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
                <div className="relative h-48 w-full bg-linear-to-b from-white/10 to-transparent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/vstars/vstars-transfer-vehicle-vip-interior.webp" alt="Mercedes Vito" className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="p-3">
                    <h4 className="text-lg font-bold text-white">Mercedes-Benz Maybach Vito</h4>
                    <p className="text-sm text-white/70">VIP Series</p>
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-2">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb- flex items-center gap-2">
                    <Info className="h-4 w-4 text-green-400"/> {t("PackageDetail.title")}
                </h4>
                <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-white/80">
                        <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                        <span>{t("PackageDetail.waitTime")}</span>
                        <Check className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                        <span>{t("PackageDetail.greet")}</span>
                    </li>
                    <li className="flex items-start gap-3 text-xs text-yellow-200/90 bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{t("PackageDetail.alert")}</span>
                    </li>
                </ul>
            </div>
        </motion.div>
    );
};