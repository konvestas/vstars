export interface FleetCardProps {
    title: string;
    description: string;
    images: string[];
    index: number;
    className?: string;
}

interface FleetItem {
    title: string;
    description: string;
    images: string[];
}

export const getHomeFleetData = (t:any) : FleetItem[] => [
    {
        title: t("items.Vito.title"),
        description: t("items.Vito.desc"),
        images: [
            "/vstars/vstars-transfer-vehicle-vip-interior.webp",
            "/vstars/vstars-transfer-vehicle-inside-reverse-view.webp",
            "/vstars/vstars-transfer-vehicle-outside-view.webp",
        ],
    }
];