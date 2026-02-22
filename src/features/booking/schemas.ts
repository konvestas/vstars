import { z } from "zod";

// Centralized constants to avoid magic strings
export const SERVICE_TYPES = {
    TRANSFER: "Transfer",
    HOURLY: "Hourly Hire",
    AIRPORT: "Airport Transfer"
} as const;

export const bookingSchema = z.object({
    serviceType: z.enum([SERVICE_TYPES.TRANSFER, SERVICE_TYPES.HOURLY, SERVICE_TYPES.AIRPORT]),

    pickupAddress: z.string().min(5, "Pickup address is required"),
    dropoffAddress: z.string().optional(),

    airport: z.string().optional(),
    direction: z.string().optional(),

    date: z.date(),
    time: z.string().min(1, "Time is required"),
    hours: z.string().optional(),

    passengers: z.number().min(1).max(10),
    luggage: z.number().min(0).max(20),

    fullName: z.string().min(2, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(6, "Phone number is required"),
    flightNo: z.string().optional(),
    notes: z.string().optional(),
    passport: z.any().optional(),
})
    .superRefine((data, ctx) => {
        if (data.serviceType === SERVICE_TYPES.TRANSFER && !data.dropoffAddress) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["dropoffAddress"],
                message: "Drop-off address is required for transfers",
            });
        }
        if (data.serviceType === SERVICE_TYPES.HOURLY && !data.hours) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["hours"],
                message: "Please select duration",
            });
        }
    });

export type BookingFormValues = z.infer<typeof bookingSchema>;