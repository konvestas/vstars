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
            "/images/vstars-transfer-vehicle-vip-interior.webp",
            "/images/vstars-transfer-vehicle-inside-reverse-view.webp",
            "/images/vstars-transfer-vehicle-outside-view.webp",
        ],
    },
    {
        title: t("items.Sprinter.title"),
        description: t("items.Sprinter.desc"),
        images: [
            "/images/vstars-transfer-vehicle-vip-interior.webp",
            "/images/vstars-transfer-vehicle-inside-reverse-view.webp",
            "/images/vstars-transfer-vehicle-outside-view.webp"
        ],
    },
];