import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_NAME = "Vstars Transfer";
const SITE_CREATOR = "Vstars Transfer & Onur Akgülay";
const BASE_URL = "https://www.vstars.com.tr";

export async function createPageMetadata({
                                             locale,
                                             namespace,
                                             path,
                                             image = "/vstars/vstars-fleet.webp",
                                             imageAlt = "Vstars Transfer luxury fleet in Istanbul",
                                             imageWidth = 1200,
                                             imageHeight = 630,
                                         }: {
    locale: string;
    namespace: string;
    path: string;
    image?: string;
    imageAlt?: string;
    imageWidth?: number;
    imageHeight?: number;
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace });
    const url = `${BASE_URL}/${locale}/${path}`;

    return {
        title: t("title"),
        description: t("description"),
        alternates: {
            canonical: `/${locale}/${path}`,
        },
        openGraph: {
            type: "website",
            url,
            locale,
            siteName: SITE_NAME,
            title: t("title"),
            description: t("description"),
            images: [
                {
                    url: `${BASE_URL}${image}`,
                    width: imageWidth,
                    height: imageHeight,
                    alt: imageAlt,
                    type: "image/webp",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            creator: SITE_CREATOR,
            title: t("title"),
            description: t("description"),
            images: [
                {
                    url: `${BASE_URL}${image}`,
                    width: imageWidth,
                    height: imageHeight,
                    alt: imageAlt,
                    type: "image/webp",
                },
            ],
        },
    };
}