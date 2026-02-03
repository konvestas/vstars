"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, ArrowRight } from "lucide-react"; // Switched Send to ArrowRight for luxury feel

import { contactSchema, ContactFormValues } from "@/app/[locale]/(public)/contact/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ContactForm() {
    const t = useTranslations("ContactPage");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(data: ContactFormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send");

            toast.success(t("successMessage"));
            form.reset();
        } catch (error) {
            toast.error(t("errorMessage"));
        } finally {
            setIsSubmitting(false);
        }
    }

    const inputStyles = "h-12 bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white transition-all duration-300";

    return (
        <div className="w-full bg-white dark:bg-black/5 p-6 md:p-10 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <div className="mb-8">
                <h3 className="text-2xl font-light text-zinc-900 dark:text-white mb-2">
                    {t("title")}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light text-sm">
                    {t("description")}
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-500">{t("form.name")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("form.namePlaceholder")} {...field} className={inputStyles} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-500">{t("form.email")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("form.emailPlaceholder")} {...field} className={inputStyles} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-500">{t("form.subject")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.subjectPlaceholder")} {...field} className={inputStyles} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs uppercase tracking-wider font-semibold text-gray-500">{t("form.message")}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={t("form.messagePlaceholder")}
                                        className={cn(inputStyles, "min-h-[160px] py-4 resize-none")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black
                                   hover:bg-zinc-700 dark:hover:bg-gray-200 transition-all uppercase tracking-widest text-xs font-bold"
                    >
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                {t("form.submit")} <ArrowRight className="h-4 w-4" />
                            </span>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}