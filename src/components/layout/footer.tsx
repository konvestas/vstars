"use client";

import Link from "next/link";
import {  Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
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
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition whitespace-nowrap"
                    >
                        <Download className="h-4 w-4" />
                        Download App
                    </Link>
                </div>

                <Separator className="my-10 bg-black" />

                {/* Main grid */}
                <div className=" text-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {/* Services */}
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2 text-muted-foreground hover:text-foreground transition">
                            <li>
                                <Link href="/services" >
                                    Airport Transfer
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    Hourly Chauffeur Ride
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    Medical Tourism
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    City Tours
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Affiliates */}
                    <div>
                        <h3 className="text-m font-semibold mb-4">Affiliates</h3>
                        <ul className="space-y-2 text-muted-foreground hover:text-foreground transition">
                            <li>
                                <Link href="/contact" >
                                    Can Duman Travel Agency
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    Visitoria Grup Sigorta
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" >
                                    Can Duman Medical Turizm
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    Can Duman Danışmanlık
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" >
                                    Agon
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div  className="text-lg">
                        <h3 className=" font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-muted-foreground hover:text-foreground transition">
                            <li>
                                <Link href="/contact-us">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq">
                                    Help & FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div className="text-lg">
                        <h3 className="font-semibold mb-4">Get in Touch</h3>
                        <p className="text-muted-foreground">
                            Questions, partnerships, or bookings — we&#39;re here to help.
                        </p>
                        <Link
                            href="/contact-us"
                            className="inline-block mt-4 font-medium underline underline-offset-4"
                        >
                            Go to Contact Page
                        </Link>
                        <div className="flex items-center gap-5 mt-5">
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                aria-label="Instagram"
                                className="p-2 rounded-xl hover:bg-muted transition"
                            >
                                <img
                                    src="/icons/Instagram.svg"
                                    alt="Instagram"
                                    className="h-5 w-5"
                                />
                            </Link>
                            <Link
                                href="https://wa.me/+905326432234"
                                target="_blank"
                                aria-label="WhatsApp"
                                className="p-2 rounded-xl hover:bg-muted transition"
                            >
                                <img
                                    src="/icons/WhatsApp.svg"
                                    alt="WhatsApp"
                                    className="h-5 w-5"
                                />
                            </Link>
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                aria-label="Facebook"
                                className="p-2 rounded-xl hover:bg-muted transition"
                            >
                                <img
                                src="/icons/facebook.png"
                                alt="Facebook"
                                loading="lazy"
                                className="h-5 w-5"
                            />
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="my-10" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-s text-muted-foreground">
                    <span>© {new Date().getFullYear()} Vstars Transfer. All rights reserved.</span>
                    <span>Premium chauffeur & travel services</span>
                </div>
            </div>
        </footer>
    );
}