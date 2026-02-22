import { bookingSchema, type BookingFormValues } from "../schemas";

export type FormValues = BookingFormValues;

export interface PassportPhotoData {
    filename: string;
    data: string;
    mimeType: string;
}

export interface BookingPayload extends BookingFormValues {
    bookingType: string;
    passportPhoto?: PassportPhotoData;
    calculatedPrice?: number;
}

export interface PricingRule {
    regions: string[];
    price: number;
}