import { PricingRule } from "./types";
export const GREETING_FEE = 200;
export const HOURLY_RATE = 750;
// Default fallback prices when no zone matches
export const DEFAULT_IST_PRICE = 2800;
export const DEFAULT_SAW_PRICE = 2800;
export const DEFAULT_GENERAL_PRICE = 2500;

export const PRICING_ZONES: PricingRule[] = [
    {
        regions: ["maltepe/istanbul", "kartal/istanbul", "pendik/istanbul", "sultanbeyli/istanbul", "çekmeköy/istanbul"],
        price: 1800
    },
    {
        regions: ["bostancı/istanbul", "kadıköy/istanbul", "beykoz/istanbul"],
        price: 2300
    },
    {
        regions: ["tuzla/istanbul", "çayırova/istanbul", "gebze/istanbul"],
        price: 2300
    },
    {
        regions: ["şile/istanbul"],
        price: 3300
    },
    {
        regions: ["şişli/istanbul", "kağıthane/istanbul", "taksim/istanbul"],
        price: 2200
    },
    {
        regions: ["beşiktaş/istanbul", "beyoğlu/istanbul", "eminönü/istanbul", "sirkeci/istanbul"],
        price: 2200
    },
    {
        regions: ["bağcılar/istanbul", "bakırköy/istanbul", "zeytinburnu/istanbul"],
        price: 2550
    },
    {
        regions: ["avcılar/istanbul", "esenyurt/istanbul", "büyükçekmece/istanbul"],
        price: 2000
    }
];
export const IST_PRICING_ZONES: PricingRule[] = [
    {
        regions: ["maltepe/istanbul", "kartal/istanbul", "sultanbeyli/istanbul", "çekmeköy/istanbul"],
        price: 2550
    },
    {
        regions: ["bostancı/istanbul", "kadıköy/istanbul", "beykoz/istanbul"],
        price: 2300
    },
    {
        regions: ["tuzla/istanbul", "pendik/istanbul", "çayırova/istanbul", "gebze/istanbul"],
        price: 2800
    },
    {
        regions: ["şile/istanbul"],
        price: 3100
    },
    {
        regions: ["şişli/istanbul", "kağıthane/istanbul", "taksim/istanbul"],
        price: 2550
    },
    {
        regions: ["beşiktaş/istanbul", "beyoğlu/istanbul", "eminönü/istanbul", "sirkeci/istanbul"],
        price: 2550
    },
    {
        regions: ["bağcılar/istanbul", "bakırköy/istanbul", "zeytinburnu/istanbul"],
        price: 2050
    },
    {
        regions: ["avcılar/istanbul", "esenyurt/istanbul", "büyükçekmece/istanbul"],
        price: 1800
    }
];
export const SAW_PRICING_ZONES: PricingRule[] = [
    {
        regions: ["maltepe/istanbul", "kartal/istanbul", "pendik/istanbul", "sultanbeyli/istanbul", "çekmeköy/istanbul"],
        price: 1800
    },
    {
        regions: ["bostancı/istanbul", "kadıköy/istanbul", "beykoz/istanbul"],
        price: 2300
    },
    {
        regions: ["tuzla/istanbul", "çayırova/istanbul", "gebze/istanbul"],
        price: 2300
    },
    {
        regions: ["şile/istanbul"],
        price: 3300
    },
    {
        regions: ["şişli/istanbul", "kağıthane/istanbul", "taksim/istanbul"],
        price: 2300
    },
    {
        regions: ["beşiktaş/istanbul", "beyoğlu/istanbul", "eminönü/istanbul", "sirkeci/istanbul"],
        price: 2300
    },
    {
        regions: ["bağcılar/istanbul", "bakırköy/istanbul", "zeytinburnu/istanbul"],
        price: 2550
    },
    {
        regions: ["avcılar/istanbul", "esenyurt/istanbul", "büyükçekmece/istanbul"],
        price: 2800
    }
];