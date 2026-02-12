// pricing-data.ts
import { PricingRule } from "./types";

export const GREETING_FEE = 200;
export const HOURLY_RATE = 750;
export const DEFAULT_AIRPORT_PRICE = 2800;
export const DEFAULT_GENERAL_PRICE = 2500;

export const PRICING_ZONES: PricingRule[] = [
    {
        regions: ["maltepe/istanbul", "kartal/istanbul", "pendik/istanbul", "sultanbeyli/istanbul", "cekmekoy/istanbul"],
        price: 1800
    },
    {
        regions: ["bostanci/istanbul", "kadikoy/istanbul", "beykoz/istanbul"],
        price: 2300
    },
    {
        regions: ["tuzla/istanbul", "cayirova/istanbul", "gebze/istanbul"],
        price: 2300
    },
    {
        regions: ["sile/istanbul"],
        price: 3300
    },
    {
        regions: ["sisli/istanbul", "kagithane/istanbul", "taksim/istanbul"],
        price: 2200
    },
    {
        regions: ["besiktas/istanbul", "beyoglu/istanbul", "eminonu/istanbul", "sirkeci/istanbul"],
        price: 2200
    },
    {
        regions: ["bagcilar/istanbul", "bakirkoy/istanbul", "zeytinburnu/istanbul"],
        price: 2550
    },
    {
        regions: ["avcilar/istanbul", "esenyurt/istanbul", "buyukcekmece/istanbul"],
        price: 2000
    }
];

export const IST_PRICING_ZONES: PricingRule[] = [
    {
        regions: ["maltepe/istanbul", "kartal/istanbul", "sultanbeyli/istanbul", "cekmekoy/istanbul"],
        price: 2550
    },
    {
        regions: ["bostanci/istanbul", "kadikoy/istanbul", "beykoz/istanbul"],
        price: 2300
    },
    {
        regions: ["tuzla/istanbul", "pendik/istanbul", "cayirova/istanbul", "gebze/istanbul"],
        price: 2800
    },
    {
        regions: ["sile/istanbul"],
        price: 3100
    },
    {
        regions: ["sisli/istanbul", "kagithane/istanbul", "taksim/istanbul"],
        price: 2550
    },
    {
        regions: ["besiktas/istanbul", "beyoglu/istanbul", "eminonu/istanbul", "sirkeci/istanbul"],
        price: 2550
    },
    {
        regions: ["bagcilar/istanbul", "bakirkoy/istanbul", "zeytinburnu/istanbul"],
        price: 2050
    },
    {
        regions: ["avcilar/istanbul", "esenyurt/istanbul", "buyukcekmece/istanbul"],
        price: 1800
    }
];

export const SAW_PRICING_ZONES: PricingRule[] = [
    {
        regions: ["maltepe/istanbul", "kartal/istanbul", "pendik/istanbul", "sultanbeyli/istanbul", "cekmekoy/istanbul"],
        price: 1800
    },
    {
        regions: ["bostanci/istanbul", "kadikoy/istanbul", "beykoz/istanbul"],
        price: 2300
    },
    {
        regions: ["tuzla/istanbul", "cayirova/istanbul", "gebze/istanbul"],
        price: 2300
    },
    {
        regions: ["sile/istanbul"],
        price: 3300
    },
    {
        regions: ["sisli/istanbul", "kagithane/istanbul", "taksim/istanbul"],
        price: 2300
    },
    {
        regions: ["besiktas/istanbul", "beyoglu/istanbul", "eminonu/istanbul", "sirkeci/istanbul"],
        price: 2300
    },
    {
        regions: ["bagcilar/istanbul", "bakirkoy/istanbul", "zeytinburnu/istanbul"],
        price: 2550
    },
    {
        regions: ["avcilar/istanbul", "esenyurt/istanbul", "buyukcekmece/istanbul"],
        price: 2800
    }
];