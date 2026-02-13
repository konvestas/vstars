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
    const [pricingLocations, setPricingLocations] = useState({
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

    // Watch necessary fields for UI updates and Pricing
    const [serviceType, pickup, dropoff, hours, airport, direction, watchedAirport] = watch([
        "serviceType", "pickupAddress", "dropoffAddress", "hours", "airport", "direction", "airport"
    ]);

    // 1. Memoized Price Calculation
    const price = useMemo(() => {
        // Use pricing-specific locations if available, fallback to form input
        const p = pricingLocations.pickup || pickup;
        const d = pricingLocations.dropoff || dropoff;
        return calculateTripPrice(serviceType, p, d, hours, airport, direction);
    }, [serviceType, pickup, dropoff, hours, airport, direction, pricingLocations]);

    // 2. Computed Display Locations (Moved from Widget to Hook)
    const displayLocations = useMemo(() => {
        const getAirportLabel = (val?: string) => {
            if (val === "istanbul-airport") return "Istanbul Airport (IST)";
            if (val === "sabiha-gokcen") return "Sabiha Gökçen Airport (SAW)";
            return val || "";
        };

        const airportLabel = getAirportLabel(watchedAirport);
        // Default logic
        let pickupDisplay = pickup;
        let dropoffDisplay = dropoff;

        // Airport logic override
        if (serviceType === SERVICE_TYPES.AIRPORT) {
            if (direction === "from-airport") {
                pickupDisplay = airportLabel;
                dropoffDisplay = pickup;
            } else if (direction === "to-airport") {
                pickupDisplay = pickup;
                dropoffDisplay = airportLabel;
            }
        }

        return { pickup: pickupDisplay, dropoff: dropoffDisplay };
    }, [serviceType, direction, watchedAirport, pickup, dropoff]);



    const handlePickupSelect = (data: { display: string, pricing: string }) => {
        setValue("pickupAddress", data.display, { shouldValidate: true });
        setPricingLocations(prev => ({ ...prev, pickup: data.pricing }));
    };

    const handleDropoffSelect = (data: { display: string, pricing: string }) => {
        setValue("dropoffAddress", data.display, { shouldValidate: true });
        setPricingLocations(prev => ({ ...prev, dropoff: data.pricing }));
    };

    const onTabChange = (val: string) => {
        const newType = val as typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];
        setValue("serviceType", newType);

        // Reset logic when switching tabs
        if (newType === SERVICE_TYPES.HOURLY) {
            setValue("dropoffAddress", "");
            setPricingLocations(prev => ({ ...prev, dropoff: "" }));
            clearErrors("dropoffAddress");
        }
        // Ensure direction is set for airport
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
            isValid = await trigger(["fullName", "email", "phone","flightNo","passport"]);
        }
        if (isValid) setStep((prev) => prev + 1);
    };

    const back = () => {
        setStep((prev) => Math.max(1, prev - 1));
    };

    // 3. Submit Logic (Moved from Widget to Hook)
    const submitBooking = async () => {
        try {
            setIsSubmitting(true);
            const formValues = getValues();

            // Handle Passport
            let passportPhoto = null;
            if (formValues.passport && formValues.passport.length > 0) {
                const file = formValues.passport[0];
                const base64Data = await fileToBase64(file);
                passportPhoto = {
                    data: base64Data,
                    filename: file.name,
                    mimeType: file.type
                };
            }

            const payload = {
                ...formValues,
                bookingType: formValues.serviceType,
                flightNumber: formValues.flightNo || "",
                notes: formValues.notes || "",
                direction: formValues.direction || "",
                duration: formValues.hours || "",
                fromLocation: displayLocations.pickup,
                toLocation: displayLocations.dropoff,
                dateInfo: {
                    date: formValues.date.toISOString(),
                    time: formValues.time
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
            } else {
                const error = await res.json();
                toast.error(error.error || "Failed to send booking request");
            }
        } catch (err) {
            console.error("Booking submission error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        step,
        price,
        isSubmitting,
        displayLocations, // Expose computed display values
        onTabChange,
        next,
        back,
        handlePickupSelect,
        handleDropoffSelect,
        submitBooking
    };
}