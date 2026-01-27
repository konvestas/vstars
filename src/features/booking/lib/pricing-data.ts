import { PricingRule } from "./types";

export const PRICING_ZONES: PricingRule[] = [
    {
        regions: ["MALTEPE/ISTANBUL", "KARTAL/ISTANBUL", "PENDİK/ISTANBUL", "SULTANBEYLİ/ISTANBUL", "ÇEKMEKÖY/ISTANBUL"],
        price: 2000
    },
    {
        regions: ["BOSTANCI/ISTANBUL", "KADIKÖY/ISTANBUL", "BEYKOZ/ISTANBUL"],
        price: 2500
    },
    {
        regions: ["TUZLA/ISTANBUL", "ÇAYIROVA/ISTANBUL", "GEBZE/ISTANBUL"],
        price: 2500
    },
    {
        regions: ["ŞİLE/ISTANBUL"],
        price: 3500
    },
    {
        regions: ["ŞİŞLİ/ISTANBUL", "KAĞITHANE/ISTANBUL", "TAKSİM/ISTANBUL"],
        price: 2500
    },
    {
        regions: ["BEŞİKTAŞ/ISTANBUL", "BEYOĞLU/ISTANBUL", "EMİNÖNÜ/ISTANBUL", "SİRKECİ/ISTANBUL"],
        price: 2500
    },
    {
        regions: ["BAĞCILAR/ISTANBUL", "BAKIRKÖY/ISTANBUL", "ZEYTİNBURNU/ISTANBUL"],
        price: 2750
    },
    {
        regions: ["AVCILAR/ISTANBUL", "ESENYURT/ISTANBUL", "BÜYÜKÇEKMECE/ISTANBUL"],
        price: 3000
    }
];
// Keywords to identify airports
export const AIRPORT_KEYWORDS = ["SABIHA", "SAW", "GOKCEN", "ISTANBUL AIRPORT", "IST"];
export const GREETING_FEE = 200;
export const HOURLY_RATE = 750;