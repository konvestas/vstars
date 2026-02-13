import { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";
import FAQClientPage from "@/app/[locale]/(public)/FAQ/client";
import {getFaqSchema} from "@/components/faqPage/data/faq-page-data";

export async function generateMetadata({
                                           params
                                       }: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const baseMetadata = await createPageMetadata({
        locale,
        namespace: "FAQPageMetadata",
        path: "faq",
        image: "/vstars/vstars-fleet.webp",
    });
    return {
        ...baseMetadata,
        openGraph: {
            ...baseMetadata.openGraph,
            type: "article",
        },
    };
}

export default async function FAQPage({
                                          params
                                      }: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params;
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema) }}
            />
            <FAQClientPage />
        </>
    );
}