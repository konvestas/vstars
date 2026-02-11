import { PricingRule } from "./types";

export const PRICING_ZONES: PricingRule[] = [
    {
        regions: ["MALTEPE/ISTANBUL", "KARTAL/ISTANBUL", "PENDİK/ISTANBUL", "SULTANBEYLİ/ISTANBUL", "ÇEKMEKÖY/ISTANBUL"],
        price: 1800
    },
    {
        regions: ["BOSTANCI/ISTANBUL", "KADIKÖY/ISTANBUL", "BEYKOZ/ISTANBUL"],
        price: 2300
    },
    {
        regions: ["TUZLA/ISTANBUL", "ÇAYIROVA/ISTANBUL", "GEBZE/ISTANBUL"],
        price: 2300
    },
    {
        regions: ["ŞİLE/ISTANBUL"],
        price: 3300
    },
    {
        regions: ["ŞİŞLİ/ISTANBUL", "KAĞITHANE/ISTANBUL", "TAKSİM/ISTANBUL"],
        price: 2200
    },
    {
        regions: ["BEŞİKTAŞ/ISTANBUL", "BEYOĞLU/ISTANBUL", "EMİNÖNÜ/ISTANBUL", "SİRKECİ/ISTANBUL"],
        price: 2200
    },
    {
        regions: ["BAĞCILAR/ISTANBUL", "BAKIRKÖY/ISTANBUL", "ZEYTİNBURNU/ISTANBUL"],
        price: 2550
    },
    {
        regions: ["AVCILAR/ISTANBUL", "ESENYURT/ISTANBUL", "BÜYÜKÇEKMECE/ISTANBUL"],
        price: 2800
    }
];
// Keywords to identify airports
export const GREETING_FEE = 200;
export const HOURLY_RATE = 750;