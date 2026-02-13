import {Coffee, Music, ShieldCheck, User, Wifi, Zap} from "lucide-react";
interface ServiceStandards {
    icon: any;
    title: string;
    description: string;
}
export const getServiceStandards = (t: any): ServiceStandards[] => [
    {
        icon: User,
        title: t("items.services.professionalChauffeurs.title"),
        description: t("items.services.professionalChauffeurs.description"),
    },
    {
        icon: ShieldCheck,
        title: t("items.services.privateConfidential.title"),
        description: t("items.services.privateConfidential.description"),
    },
    {
        icon: Zap,
        title: t("items.services.stayConnected.title"),
        description: t("items.services.stayConnected.description"),
    },
    {
        icon: Wifi,
        title: t("items.services.onboardWifi.title"),
        description: t("items.services.onboardWifi.description"),
    },
    {
        icon: Music,
        title: t("items.services.climateMedia.title"),
        description: t("items.services.climateMedia.description"),
    },
    {
        icon: Coffee,
        title: t("items.services.thoughtfulAmenities.title"),
        description: t("items.services.thoughtfulAmenities.description"),
    },
];

export const getVehicleSchemas = [
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Mercedes-Benz Vito Maybach",
        "description": "Luxury sedan for executive transfers and VIP transportation",
        "image": "https://www.vstarstransfer.com/vstars/vstars-fleet.webp",
        "brand": {
            "@type": "Brand",
            "name": "Mercedes-Benz"
        },
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "TL"
        }
    },
];