import {Clock, Headset, ShieldCheck, Star} from "lucide-react";

interface ChooseUsItem {
    title: string;
    desc: string;
    icon: any;
}
export const getHomeChooseUsData = (t: any): ChooseUsItem[] => [
    {
        title: t("highlights.0.title"),
        desc: t("highlights.0.desc"),
        icon: ShieldCheck,
    },
    {
        title: t("highlights.1.title"),
        desc: t("highlights.1.desc"),
        icon: Clock,
    },
    {
        title: t("highlights.2.title"),
        desc: t("highlights.2.desc"),
        icon: Star,
    },
    {
        title: t("highlights.3.title"),
        desc: t("highlights.3.desc"),
        icon: Headset,
    },
];