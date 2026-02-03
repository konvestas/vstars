
interface IFleetSectionData {
    title: string;
    description: string;
}
export const getFleetImages = [
    "/vstars/vstars-transfer-vehicle-vip-interior.webp",
    "/vstars/vstars-transfer-vehicle-inside-reverse-view.webp",
    "/vstars/vstars-transfer-vehicle-outside-view.webp",
];

export const getFleetSectionData = (t:any): IFleetSectionData[]  => [
    {
        title: t("items.details.capacityTitle"),
        description: t("items.details.capacityDesc"),
    },
    {
        title: t("items.details.luggageTitle"),
        description: t("items.details.luggageDesc"),
    },
    {
        title: t("items.details.AmbianceTitle"),
        description: t("items.details.AmbianceDesc"),
    },
    {
        title: t("items.details.ConnectivityTitle"),
        description: t("items.details.ConnectivityDesc"),
    },
    {
        title: t("items.details.RefreshmentsTitle"),
        description: t("items.details.RefreshmentsDesc"),
    },
    {
        title: t("items.details.PowerTitle"),
        description: t("items.details.PowerDesc"),
    },
];