import { PricingRule } from "./types";

export const PRICING_ZONES: PricingRule[] = [
    {
        regions: ["MALTEPE", "KARTAL", "PENDİK", "SULTANBEYLİ", "ÇEKMEKÖY"],
        price: 2000
    },
    {
        regions: ["BOSTANCI", "KADIKÖY", "BEYKOZ"],
        price: 2500
    },
    {
        regions: ["TUZLA", "ÇAYIROVA", "GEBZE"],
        price: 2500
    },
    {
        regions: ["ŞİLE"],
        price: 3500
    },
    {
        regions: ["ŞİŞLİ", "KAĞITHANE", "TAKSİM"],
        price: 2500
    },
    {
        regions: ["BEŞİKTAŞ", "BEYOĞLU", "EMİNÖNÜ", "SİRKECİ"],
        price: 2500
    },
    {
        regions: ["BAĞCILAR", "BAKIRKÖY", "ZEYTİNBURNU"],
        price: 2750
    },
    {
        regions: ["AVCILAR", "ESENYURT", "BÜYÜKÇEKMECE"],
        price: 3000
    }
];
// Keywords to identify airports
export const AIRPORT_KEYWORDS = ["SABIHA", "SAW", "GOKCEN", "ISTANBUL AIRPORT", "IST"];
export const GREETING_FEE = 200;
export const HOURLY_RATE = 750;