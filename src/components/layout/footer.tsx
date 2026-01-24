
import Link from "next/link";
import {  Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {useTranslations} from "next-intl";
import {cn} from "@/lib/utils";

export default function Footer() {
    const t = useTranslations("Footer");
    const textHover = cn("hover:underline text-muted-foreground hover:text-foreground ")

    return (
        <footer className="w-full bg-muted/40 border-t">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top section */}
                <div className="flex items-center justify-between gap-4">
                    {/* Left Side: Logo */}
                    <div className="flex items-center gap-3">
                        <span className="font-lexend text-xl md:text-2xl md:tracking-[0.2em] font-bold tracking-tight">
                            Vstars
                        </span>
                    </div>

                    {/* Right Side: Download Button */}
                    <Link
                        href="/download"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium
                        text-primary-foreground shadow hover:opacity-90 transition whitespace-nowrap"
                    >
                        <Download className="h-4 w-4" />
                        {t("downloadApp")}
                    </Link>
                </div>

                <Separator className="my-10 bg-black" />

                {/* Main grid */}
                <div className=" text-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    <div>
                        <h3 className="font-semibold mb-4">{t("services")}</h3>
                        <ul className="space-y-2 transition">
                            <li>
                                <Link href="/services" className={textHover} >
                                    {t("airportTransfer")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className={textHover}>
                                    {t("hourlyChauffeurRide")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className={textHover}>
                                    {t("medicalTourism")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className={textHover}>
                                    {t("cityTours")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-m font-semibold mb-4">{("affiliates")}</h3>
                        <ul className="space-y-2 text-muted-foreground hover:text-foreground transition">
                            <li>
                                <Link href="/contact" className={textHover} >
                                    Can Duman Travel Agency
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className={textHover}>
                                    Visitoria Grup Sigorta
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className={textHover} >
                                    Can Duman Medical Turizm
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className={textHover}>
                                    Can Duman Danışmanlık
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className={textHover} >
                                    Agon
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div  className="text-lg">
                        <h3 className=" font-semibold mb-4">{t("Support")}</h3>
                        <ul className="space-y-2 text-muted-foreground hover:text-foreground transition">
                            <li>
                                <Link href="/contact" className={textHover}>
                                    {t("contactUs")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className={textHover}>
                                    {t("helpFaq")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div className="text-lg">
                        <h3 className="font-semibold mb-4">  {t("getInTouch")}</h3>
                        <p className="text-muted-foreground">
                            {t("questions")}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block mt-4 font-medium underline underline-offset-4"
                        >
                            {t("goToContactPage")}
                        </Link>
                        <div className="flex items-center gap-7 mt-8">
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                aria-label="Instagram"
                            >
                                <img
                                    src="/icons/Instagram.svg"
                                    alt="Instagram"
                                    className="h-7 w-7"
                                />
                            </Link>
                            <Link
                                href="https://wa.me/+905326432234"
                                target="_blank"
                                aria-label="WhatsApp"
                            >
                                <img
                                    src="/icons/WhatsApp.svg"
                                    alt="WhatsApp"
                                    className="h-7 w-7"
                                />
                            </Link>
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                aria-label="Facebook"
                            >
                                <img
                                src="/icons/facebook.png"
                                alt="Facebook"
                                loading="lazy"
                                className="h-7 w-7"
                            />
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="my-10 bg-black"/>

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-s text-muted-foreground">
                    <span>© {new Date().getFullYear()} Vstars Transfer. All rights reserved.</span>
                    <span>{t("premium")}</span>
                </div>
            </div>
        </footer>
    );
}