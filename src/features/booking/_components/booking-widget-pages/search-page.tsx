import {useFormContext} from "react-hook-form";
import {useTranslations} from "next-intl";
import {motion} from "framer-motion";
import {SERVICE_TYPES} from "@/features/booking/schemas";
import {FormField} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {LocationInput} from "@/features/booking/_components/location-input";
import {AirportInput} from "@/features/booking/_components/airport-input";
import {DurationInput} from "@/features/booking/_components/duration-input";
import DateTimeInput from "@/features/booking/_components/date-time-input";
import {PassengerLuggageInput} from "@/features/booking/_components/passenger-luggage-input";
import {BookingWidgetStyles} from "@/features/booking/_components/booking-widget-pages/styles";

export  const StepSearch = ({ handlePickupSelect, handleDropoffSelect }: { handlePickupSelect: any, handleDropoffSelect: any }) => {
    const { control, watch, setValue, formState: { errors } } = useFormContext();
    const t = useTranslations('BookingWidget');

    const [serviceType, direction, date, time, passengers, luggage] = watch([
        "serviceType", "direction", "date", "time", "passengers", "luggage"
    ]);

    return (
        <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">

            {/* Airport Direction Toggle */}
            {serviceType === SERVICE_TYPES.AIRPORT && (
                <FormField control={control} name="direction" render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                        {["to-airport", "from-airport"].map((dir) => (
                            <button
                                key={dir} type="button" onClick={() => field.onChange(dir)}
                                className={cn("h-12 rounded-xl font-medium transition-all", field.value === dir ? "bg-white text-black shadow-lg" : "bg-white/10 text-white hover:bg-white/20")}
                            >
                                {dir === "to-airport" ? "To Airport" : "From Airport"}
                            </button>
                        ))}
                    </div>
                )} />
            )}

            {/* Fields based on Service Type */}
            {serviceType === SERVICE_TYPES.AIRPORT && direction === "to-airport" && (
                <>
                    <FormField control={control} name="pickupAddress" render={({ field }) => (
                        <LocationInput label={t("Form.pickUpLocation")} placeholder={t("Form.pickUpLocationPlaceHolder")} value={field.value} onChange={field.onChange} onLocationSelect={handlePickupSelect} error={errors.pickupAddress?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                    <FormField control={control} name="airport" render={({ field }) => (
                        <AirportInput label={t("Form.dropOffLocation")} placeholder="Select Airport" value={field.value} onChange={field.onChange} error={errors.airport?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                </>
            )}

            {serviceType === SERVICE_TYPES.AIRPORT && direction === "from-airport" && (
                <>
                    <FormField control={control} name="airport" render={({ field }) => (
                        <AirportInput label={t("Form.pickUpLocation")} placeholder="Select Airport" value={field.value} onChange={field.onChange} error={errors.airport?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                    <FormField control={control} name="pickupAddress" render={({ field }) => (
                        <LocationInput label={t("Form.dropOffLocation")} placeholder={t("Form.dropOffLocationPlaceHolder")} value={field.value} onChange={field.onChange} onLocationSelect={handlePickupSelect} error={errors.pickupAddress?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                </>
            )}

            {serviceType === SERVICE_TYPES.TRANSFER && (
                <>
                    <FormField control={control} name="pickupAddress" render={({ field }) => (
                        <LocationInput label={t("Form.pickUpLocation")} placeholder={t("Form.pickUpLocationPlaceHolder")} value={field.value} onChange={field.onChange} onLocationSelect={handlePickupSelect} error={errors.pickupAddress?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                    <FormField control={control} name="dropoffAddress" render={({ field }) => (
                        <LocationInput label={t("Form.dropOffLocation")} placeholder={t("Form.dropOffLocationPlaceHolder")} value={field.value} onChange={field.onChange} onLocationSelect={handleDropoffSelect} error={errors.dropoffAddress?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                </>
            )}

            {serviceType === SERVICE_TYPES.HOURLY && (
                <>
                    <FormField control={control} name="pickupAddress" render={({ field }) => (
                        <LocationInput label={t("Form.pickUpLocation")} placeholder={t("Form.pickUpLocationPlaceHolder")} value={field.value} onChange={field.onChange} onLocationSelect={handlePickupSelect} error={errors.pickupAddress?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                    <FormField control={control} name="hours" render={({ field }) => (
                        <DurationInput label={t("Form.duration")} placeholder={t("Form.durationPlaceHolder")} value={field.value || ""} onChange={field.onChange} error={errors.hours?.message as string} className={BookingWidgetStyles.glassInput} />
                    )} />
                </>
            )}

            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-2">
                <DateTimeInput
                    label={t("Form.date")} placeholder={t("Form.datePlaceHolder")} date={date} time={time}
                    onConfirm={(d, t) => { setValue("date", d, { shouldValidate: true }); setValue("time", t, { shouldValidate: true }); }}
                    className={BookingWidgetStyles.glassInput} error={(errors.date?.message || errors.time?.message) as string}
                />
                <PassengerLuggageInput
                    label={t("Form.PassengerLuggage")} placeholder={t("Form.selected")}
                    value={{ passengers: passengers?.toString() || "1", luggage: luggage?.toString() || "0" }}
                    onChange={(val) => { setValue("passengers", parseInt(val.passengers), { shouldValidate: true }); setValue("luggage", parseInt(val.luggage), { shouldValidate: true }); }}
                    className={BookingWidgetStyles.glassInput} error={errors.passengers?.message as string}
                />
            </div>
        </motion.div>
    );
};