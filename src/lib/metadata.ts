import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function createPageMetadata({
                                             locale,
                                             namespace,
                                             path,
                                             image = "/vstars/vstars-fleet.webp",
                                             imageAlt,
                                         }: {
    locale: string;
    namespace: string;
    path: string;
    image?: string;
    imageAlt?: string;
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace });
    const baseUrl = "https://www.vstarstransfer.com";

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `/${locale}/${path}`,
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `${baseUrl}/${locale}/${path}`,
            type: "website",
            images: [{
                url: `${baseUrl}${image}`,
                width: 800,
                height: 600,
                alt: "Vstars Transfer luxury fleet in Istanbul",
                type: "image/webp",
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
            images: {
                url: `${baseUrl}${image}`,
                alt: "Vstars Transfer luxury fleet in Istanbul",
                type: "image/webp",
            },
        },
    };
}