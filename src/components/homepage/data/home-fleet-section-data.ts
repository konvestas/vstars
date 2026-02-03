
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
        title: t("items.new.capacityTitle"),
        description: t("items.new.capacityDesc"),
    },
    {
        title: t("items.new.luggageTitle"),
        description: t("items.new.luggageDesc"),
    },
    {
        title: t("items.new.AmbianceTitle"),
        description: t("items.new.AmbianceDesc"),
    },
    {
        title: t("items.new.ConnectivityTitle"),
        description: t("items.new.ConnectivityDesc"),
    },
    {
        title: t("items.new.RefreshmentsTitle"),
        description: t("items.new.RefreshmentsDesc"),
    },
    {
        title: t("items.new.PowerTitle"),
        description: t("items.new.PowerDesc"),
    },
];