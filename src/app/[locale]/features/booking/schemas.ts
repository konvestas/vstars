import { z } from "zod";

// Centralized constants to avoid magic strings
export const SERVICE_TYPES = {
    TRANSFER: "transfer",
    HOURLY: "hourly",
} as const;

export const bookingSchema = z.object({
    // Type
    serviceType: z.enum([SERVICE_TYPES.TRANSFER, SERVICE_TYPES.HOURLY]),

    // Locations
    pickupAddress: z.string().min(5, "Pickup address is required"),
    dropoffAddress: z.string().optional(),

    // Timing
    date: z.date(),
    time: z.string().min(1, "Time is required"),
    hours: z.string().optional(),

    // Pax
    passengers: z.number().min(1).max(10),
    luggage: z.number().min(0).max(20),

    // Contact (Step 2)
    fullName: z.string().min(2, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(6, "Phone number is required"),
    flightNo: z.string().optional(),
    notes: z.string().optional(),
})
    .superRefine((data, ctx) => {
        // CONDITIONAL VALIDATION:
        // If service is TRANSFER, Drop-off is strictly required.
        if (data.serviceType === SERVICE_TYPES.TRANSFER && !data.dropoffAddress) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["dropoffAddress"],
                message: "Drop-off address is required for transfers",
            });
        }
        // If service is HOURLY, Hours is required.
        if (data.serviceType === SERVICE_TYPES.HOURLY && !data.hours) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["hours"],
                message: "Please select duration",
            });
        }
    });

export type BookingFormValues = z.infer<typeof bookingSchema>;