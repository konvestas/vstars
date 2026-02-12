"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues, SERVICE_TYPES } from "../schemas";
import { calculateTripPrice } from "@/features/booking/lib/utils";
import { toast } from "sonner";

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

export function useBookingForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State for the "Pricing" version of the address (e.g. "maltepe/istanbul")
    const [pricingData, setPricingData] = useState({
        pickup: "",
        dropoff: ""
    });

    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        mode: "onChange",
        defaultValues: {
            serviceType: SERVICE_TYPES.TRANSFER,
            passengers: 1,
            luggage: 0,
            hours: "4",
            date: new Date(),
            pickupAddress: "",
            dropoffAddress: "",
            time: "",
            fullName: "",
            email: "",
            phone: "",
            notes: ""
        },
    });

    const { watch, trigger, setValue, getValues, clearErrors } = form;

    // Watch fields for reactive logic
    const [serviceType, pickup, dropoff, hours, airport, direction, watchedDirection, watchedAirport] = watch([
        "serviceType",
        "pickupAddress",
        "dropoffAddress",
        "hours",
        "airport",
        "direction",
        "direction",
        "airport"
    ]);

    // 1. CALCULATE PRICE
    const price = useMemo(() => {
        const p = pricingData.pickup || pickup;
        const d = pricingData.dropoff || dropoff;
        return calculateTripPrice(serviceType, p, d, hours, airport, direction);
    }, [serviceType, pickup, dropoff, hours, airport, direction, pricingData]);

    // 2. DISPLAY ADDRESS LOGIC
    // Centralized logic for what text to show in the "Summary" or "Trip Info"
    const displayLocations = useMemo(() => {
        const getAirportLabel = (val?: string) => {
            if (val === "istanbul-airport") return "Istanbul Airport (IST)";
            if (val === "sabiha-gokcen") return "Sabiha Gökçen Airport (SAW)";
            return val || "";
        };

        const airportLabel = getAirportLabel(watchedAirport);
        let pickupDisplay = pickup;
        let dropoffDisplay = dropoff;

        if (serviceType === SERVICE_TYPES.AIRPORT) {
            if (watchedDirection === "from-airport") {
                pickupDisplay = airportLabel;
                dropoffDisplay = pickup; // User's destination is stored in pickupAddress field logic
            } else if (watchedDirection === "to-airport") {
                pickupDisplay = pickup;
                dropoffDisplay = airportLabel;
            }
        }

        return { pickup: pickupDisplay, dropoff: dropoffDisplay };
    }, [serviceType, watchedDirection, watchedAirport, pickup, dropoff]);


    // 3. HANDLERS
    const handlePickupSelect = (data: { display: string, pricing: string }) => {
        setValue("pickupAddress", data.display, { shouldValidate: true });
        setPricingData(prev => ({ ...prev, pickup: data.pricing }));
    };

    const handleDropoffSelect = (data: { display: string, pricing: string }) => {
        setValue("dropoffAddress", data.display, { shouldValidate: true });
        setPricingData(prev => ({ ...prev, dropoff: data.pricing }));
    };

    const onTabChange = (val: string) => {
        const newType = val as typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];
        setValue("serviceType", newType);

        // Reset specific fields when switching tabs
        if (newType === SERVICE_TYPES.HOURLY) {
            setValue("dropoffAddress", "");
            setPricingData(prev => ({ ...prev, dropoff: "" }));
            clearErrors("dropoffAddress");
        }

        // Set default direction for Airport tab if missing
        if (newType === SERVICE_TYPES.AIRPORT && !getValues("direction")) {
            setValue("direction", "from-airport");
        }
    };

    const next = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await trigger(["pickupAddress", "dropoffAddress", "hours", "date", "time", "passengers"]);
        } else if (step === 2) {
            isValid = true;
        } else if (step === 3) {
            isValid = await trigger(["fullName", "email", "phone", "flightNo", "passport"]);
        }
        if (isValid) setStep((prev) => prev + 1);
    };

    const back = () => {
        setStep((prev) => Math.max(1, prev - 1));
    };

    // 4. SUBMISSION LOGIC
    const submitBooking = async () => {
        try {
            setIsSubmitting(true);
            const values = getValues();

            // Prepare Passport Photo
            let passportPhoto = null;
            if (values.passport && values.passport.length > 0) {
                const file = values.passport[0];
                const base64Data = await fileToBase64(file);
                passportPhoto = {
                    data: base64Data,
                    filename: file.name,
                    mimeType: file.type
                };
            }

            // Prepare Payload using the Display Logic we calculated above
            const { pickup: fromLocation, dropoff: toLocation } = displayLocations;

            const payload = {
                ...values,
                flightNumber: values.flightNo || "",
                notes: values.notes || "",
                direction: values.direction || "",
                duration: values.hours || "",
                fromLocation,
                toLocation,
                dateInfo: {
                    date: values.date.toISOString(),
                    time: values.time
                },
                passportPhoto,
                calculatedPrice: price
            };

            const res = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Booking request submitted successfully!");
                return true;
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to send booking request");
                return false;
            }
        } catch (err) {
            console.error("Booking submission error:", err);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        step,
        price,
        isSubmitting,
        displayLocations, // Expose the calculated display addresses
        onTabChange,
        handlePickupSelect,
        handleDropoffSelect,
        next,
        back,
        submitBooking
    };
}