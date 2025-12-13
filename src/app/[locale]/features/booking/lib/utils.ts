import { PRICING_ZONES, AIRPORT_KEYWORDS, GREETING_FEE, HOURLY_RATE } from "./pricing-data";
import { SERVICE_TYPES } from "../schemas";
// --- PRICING LOGIC ---

export const calculateTripPrice = (
    bookingType: string,
    from: string,
    to: string | undefined,
    duration: string | undefined
): number => {

    // 1. Hourly Calculation
    if (bookingType === SERVICE_TYPES.HOURLY && duration) {
        const hours = parseInt(duration, 10);
        return (hours * HOURLY_RATE) + GREETING_FEE;
    }

    // 2. Transfer (One Way) Calculation
    if (bookingType === SERVICE_TYPES.TRANSFER) {
        const locationString = (from + " " + (to || "")).toUpperCase();

        // Find matching zone
        const matchedZone = PRICING_ZONES.find(zone =>
            zone.regions.some(region => locationString.includes(region))
        );

        if (matchedZone) {
            return matchedZone.price + GREETING_FEE;
        }

        // Default Fallback
        return 2500 + GREETING_FEE;
    }

    return 0;
};

// --- IMAGE UTILS ---

export const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const MAX_SIZE = 800;
                if (width > height && width > MAX_SIZE) {
                    height *= MAX_SIZE / width;
                    width = MAX_SIZE;
                } else if (height > MAX_SIZE) {
                    width *= MAX_SIZE / height;
                    height = MAX_SIZE;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], file.name, { type: file.type, lastModified: Date.now() }));
                    } else reject(new Error('Compression failed'));
                }, file.type, 0.8);
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};