import {
    IST_PRICING_ZONES,
    SAW_PRICING_ZONES,
    PRICING_ZONES,
    GREETING_FEE,
    HOURLY_RATE,
    DEFAULT_AIRPORT_PRICE,
    DEFAULT_GENERAL_PRICE
} from "./pricing-data";
import { SERVICE_TYPES } from "../schemas";


export const normalizeToEnglish = (text: string): string => {
    if (!text) return "";

    let normalized = text.toLowerCase();

    const turkishMap: { [key: string]: string } = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'i': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'I': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    };

    // Replace special Turkish chars
    normalized = normalized.replace(/[çğıiöşüÇĞİIÖŞÜ]/g, (match) => turkishMap[match] || match);
    // Remove accents and trim
    return normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
};

const getPricingZones = (bookingType: string, airport?: string) => {
    if (bookingType === SERVICE_TYPES.AIRPORT) {
        if (airport === "istanbul-airport" || airport === "IST") {
            return { zones: IST_PRICING_ZONES, defaultPrice: DEFAULT_AIRPORT_PRICE };
        } else if (airport === "sabiha-gokcen" || airport === "SAW") {
            return { zones: SAW_PRICING_ZONES, defaultPrice: DEFAULT_AIRPORT_PRICE };
        }
    }
    return { zones: PRICING_ZONES, defaultPrice: DEFAULT_GENERAL_PRICE };
};


export const calculateTripPrice = (
    bookingType: string,
    from: string,
    to: string | undefined,
    duration: string | undefined,
    airport?: string,
    direction?: string
): number => {

    // 1. Hourly
    if (bookingType === SERVICE_TYPES.HOURLY && duration) {
        const hours = parseInt(duration, 10);
        return (hours * HOURLY_RATE) + GREETING_FEE;
    }

    // 2. Airport Transfer
    if (bookingType === SERVICE_TYPES.AIRPORT) {
        const { zones, defaultPrice } = getPricingZones(bookingType, airport);

        // NORMALIZE THE INPUT
        const normalizedTarget = normalizeToEnglish(from);

        const matchedZone = zones.find(zone =>
            zone.regions.some(region => {
                const normalizedRegion = normalizeToEnglish(region);
                return normalizedTarget === normalizedRegion ||
                    normalizedTarget.startsWith(normalizedRegion + "/");
            })
        );

        if (matchedZone) {
            return matchedZone.price + GREETING_FEE;
        }

        return defaultPrice + GREETING_FEE;
    }

    // 3. One Way Transfer
    if (bookingType === SERVICE_TYPES.TRANSFER) {
        const { zones, defaultPrice } = getPricingZones(bookingType);
        const combinedAddress = normalizeToEnglish(from + " " + (to || ""));

        const matchedZone = zones.find(zone =>
            zone.regions.some(region => combinedAddress.includes(normalizeToEnglish(region)))
        );

        if (matchedZone) {
            return matchedZone.price + GREETING_FEE;
        }
        return defaultPrice + GREETING_FEE;
    }

    return 0;
};