import {useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {motion} from "framer-motion";
import {Label} from "@/components/ui/label";
import {Mail, Phone, Plane, UploadCloud, User, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {BookingWidgetStyles} from "@/features/booking/_components/booking-widget-pages/styles";
import {StepGuestInfoProps} from "@/features/booking/_components/booking-widget-pages/data/guest-info-page-data";

export const StepGuestInfo = ({ price }: StepGuestInfoProps) => {
    const { register, formState: { errors }, setValue } = useFormContext();
    const t = useTranslations('BookingWidget');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setFileName(file.name);
            setValue("passport", e.target.files, { shouldValidate: true });
        }
    };
    const clearFile = () => { setPreviewUrl(null); setFileName(null); setValue("passport", null); };

    return (
        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-white tracking-tight">{t("GuestInfo.title")}</h3>
                <p className="text-sm text-white/60 mt-1">{t("GuestInfo.desc")}</p>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                        <Label htmlFor="fullName" className={BookingWidgetStyles.glassLabel}>{t("GuestInfo.fullname")}</Label>
                        <User className={BookingWidgetStyles.iconContainer} />
                        <Input placeholder="John Doe" {...register("fullName")} id="fullName" autoComplete="on" className={cn(BookingWidgetStyles.glassInput, errors.fullName && "border-red-500 ring-1 ring-red-500")} />
                    </div>
                    <div className="relative group">
                        <Label htmlFor="phone" className={BookingWidgetStyles.glassLabel}>{t("GuestInfo.phone")}</Label>
                        <Phone className={BookingWidgetStyles.iconContainer} />
                        <Input placeholder="+1 234 567 890" {...register("phone")} id="phone" autoComplete="tel" className={cn(BookingWidgetStyles.glassInput, errors.phone && "border-red-500 ring-1 ring-red-500")} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                        <Label htmlFor="email" className={BookingWidgetStyles.glassLabel}>{t("GuestInfo.email")}</Label>
                        <Mail className={BookingWidgetStyles.iconContainer} />
                        <Input placeholder="john@example.com" {...register("email")} id="email" autoComplete="email" className={cn(BookingWidgetStyles.glassInput, errors.email && "border-red-500 ring-1 ring-red-500")} />
                    </div>
                    <div className="relative group">
                        <Label htmlFor="flightNo" className={BookingWidgetStyles.glassLabel}>{t("GuestInfo.flightNumber")}</Label>
                        <Plane className={BookingWidgetStyles.iconContainer} />
                        <Input placeholder="TK 1234" {...register("flightNo")} id="flightNo" className={BookingWidgetStyles.glassInput} />
                    </div>
                </div>
                <div className="relative group">
                    <Label htmlFor="notes" className={BookingWidgetStyles.glassLabel}>{t("GuestInfo.driverNote")}</Label>
                    <Textarea placeholder={t("GuestInfo.driverNotePlaceHolder")} {...register("notes")} id="notes" className={BookingWidgetStyles.glassInput} />
                </div>
                {/* File Upload */}
                <div className="space-y-2">
                    <Label className={BookingWidgetStyles.glassLabel}>{t("GuestInfo.passportPhoto")}</Label>
                    {!previewUrl ? (
                        <div className="relative">
                            <Input  type="file" accept="image/*" className="hidden" id="passport-upload" onChange={handleFileChange} />
                            <label htmlFor="passport-upload" className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all hover:border-white/40 group">
                                <div className="flex items-center gap-2 text-white/60  group-hover:text-white transition-colors">
                                    <UploadCloud className="h-5 w-5" />
                                    <span className="text-sm font-medium">{t("GuestInfo.click")}</span>
                                </div>
                            </label>
                        </div>
                    ) : (
                        <div className="relative w-full h-20 rounded-xl overflow-hidden border border-white/20 group bg-black/40">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={previewUrl} alt="Passport" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <span className="text-sm font-medium text-white truncate">{fileName}</span>
                                <Button size="icon" variant="ghost" type="button" onClick={clearFile} className="h-8 w-8 text-white hover:bg-red-500/20 hover:text-red-400 rounded-full"><X className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    )}
                </div>
                {/* Total */}
                <div className="flex justify-between items-center px-4 py-3 bg-white/10 rounded-xl border border-white/10">
                    <span className="text-sm text-white/80">{t("GuestInfo.summaryEstimated")}</span>
                    <span className="text-xl font-bold text-green-400">{price} TL</span>
                </div>
            </div>
        </motion.div>
    );
};