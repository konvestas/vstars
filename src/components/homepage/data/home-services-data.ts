export interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    toServicesId: string;
    index: number;
    className?: string;
}
interface ServiceItem {
    title: string;
    description: string;
    image: string;
    toServicesId: string;
}
export const getHomeServicesData = (t: any): ServiceItem[] => [
    {
        title: t("items.hourlyHire.title"),
        description: t("items.hourlyHire.desc"),
        image: "/images/istanbul-hourly-hire-private-driver.webp",
        toServicesId: "hourly-hire"
    },
    {
        title: t("items.airportTransfers.title"),
        description: t("items.airportTransfers.desc"),
        image: "/images/istanbul-airport-vip-transfer-mercedes.webp",
        toServicesId: "airport-transfers"
    },
    {
        title: t("items.medicalTourism.title"),
        description: t("items.medicalTourism.desc"),
        image: "/images/can-duman-medical-tourism.webp",
        toServicesId:"medical-tourism"
    },
    {
        title: t("items.cityTour.title"),
        description: t("items.cityTour.desc"),
        image: "/images/istanbul-15-Temmuz-bridge-view-scenery.webp",
        toServicesId:"city-tour"
    },
];