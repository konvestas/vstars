import Link from "next/link";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function Footer() {
    const t = useTranslations("Footer");
    const linkStyle = cn(
        "block w-fit text-base md:text-lg font-light text-muted-foreground",
        "hover:text-zinc-900 dark:hover:text-white hover:underline cursor-pointer transition-colors duration-200"
    );
    const headerStyle = "text-base md:text-lg font-semibold uppercase tracking-wider text-zinc-900 dark:text-white mb-6";

    return (
        <footer className="w-full bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800 font-sans transition-colors">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 md:py-16">

                {/* --- TOP SECTION: Brand & CTA --- */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Brand - Restored font-lexend */}
                    <div className="flex items-center gap-3">
                        <span className="font-lexend text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Vstars
                        </span>
                    </div>

                    {/* Download Button */}
                    <Link
                        href="/download"
                        className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium
                        bg-zinc-900 text-white hover:bg-zinc-700 hover:opacity-90
                        dark:bg-white dark:text-black dark:hover:bg-gray-200
                        transition-all shadow-sm cursor-pointer"
                    >
                        <Download className="h-4 w-4" />
                        {t("downloadApp")}
                    </Link>
                </div>

                <Separator className="my-10 bg-gray-200 dark:bg-zinc-800" />

                {/* --- MAIN GRID --- */}
                {/* Reduced gap from 12 to 8 to bring columns closer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">

                    {/* Column 1: Services */}
                    <div>
                        <h3 className={headerStyle}>{t("services")}</h3>
                        <ul className="space-y-3">
                            <li><Link href="/services#airport-transfers" className={linkStyle}>{t("airportTransfer")}</Link></li>
                            <li><Link href="/services#hourly-hire" className={linkStyle}>{t("hourlyChauffeurRide")}</Link></li>
                            <li><Link href="/services#medical-tourism" className={linkStyle}>{t("medicalTourism")}</Link></li>
                            <li><Link href="/services#city-tour" className={linkStyle}>{t("cityTours")}</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Affiliates */}
                    <div>
                        <h3 className={headerStyle}>{("Affiliates")}</h3>
                        <ul className="space-y-3">
                            <li><Link href="/affiliates#affiliates-information-can-duman-medical-tourism" className={linkStyle}>Can Duman Medical Turizm</Link></li>
                            <li><Link href="/affiliates#affiliates-information-can-duamn-Travel-Agency" className={linkStyle}>Can Duman Travel Agency</Link></li>
                            <li><Link href="/affiliates#affiliates-information-visitoria" className={linkStyle}>Visitoria Grup Sigorta</Link></li>
                            <li><Link href="/affiliates#affiliates-information-can-duman-danismanlik" className={linkStyle}>Can Duman Danışmanlık</Link></li>
                            <li><Link href="/affiliates#affiliates-information-can-duman-akademi" className={linkStyle}>Can Duman Akademi</Link></li>
                            <li><Link href="/affiliates#affiliates-information-agon" className={linkStyle}>Agon</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className={headerStyle}>{t("Support")}</h3>
                        <ul className="space-y-3">
                            <li><Link href="/contact" className={linkStyle}>{t("contactUs")}</Link></li>
                            <li><Link href="/FAQ" className={linkStyle}>{t("helpFaq")}</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Socials */}
                    <div>
                        <h3 className={headerStyle}>{t("getInTouch")}</h3>
                        <p className="text-base md:text-lg font-light text-muted-foreground mb-4 leading-relaxed">
                            {t("questions")}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block text-base md:text-lg font-medium text-zinc-900 dark:text-white
                             underline decoration-1 underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300
                              transition-colors mb-8 cursor-pointer"
                        >
                            {t("goToContactPage")}
                        </Link>

                        {/* Social Icons - Restored Original Images */}
                        <div className="flex items-center gap-6">
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                aria-label="Instagram"
                                className=" cursor-pointer"
                            >
                                <img
                                    src="/icons/Instagram.svg"
                                    alt="Instagram"
                                    className="h-8 w-8"
                                />
                            </Link>
                            <Link
                                href="https://wa.me/+905326432234"
                                target="_blank"
                                aria-label="WhatsApp"
                                className="cursor-pointer"
                            >
                                <img
                                    src="/icons/WhatsApp.svg"
                                    alt="WhatsApp"
                                    className="h-8 w-8"
                                />
                            </Link>
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                aria-label="Facebook"
                                className="cursor-pointer"
                            >
                                <img
                                    src="/icons/facebook.png"
                                    alt="Facebook"
                                    loading="lazy"
                                    className="h-8 w-8"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="my-10 bg-gray-200 dark:bg-zinc-800" />

                {/* --- BOTTOM SECTION --- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <span>© {new Date().getFullYear()} Vstars Transfer. All rights reserved.</span>
                    <span>{t("premium")}</span>
                </div>
            </div>
        </footer>
    );
}