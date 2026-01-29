"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";

import { contactSchema, ContactFormValues } from "@/app/[locale]/(public)/contact/schemas"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

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

    return (
        <Card className="p-6 md:p-8 border-gray-200 dark:border-white/10 bg-white/50
        dark:bg-white/5 backdrop-blur-sm shadow-xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("form.name")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("form.namePlaceholder")} {...field}
                                               className="bg-white/80 dark:bg-black/20" />
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
                                    <FormLabel>{t("form.email")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("form.emailPlaceholder")} {...field}
                                               className="bg-white/80 dark:bg-black/20" />
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
                                <FormLabel>{t("form.subject")}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t("form.subjectPlaceholder")} {...field}
                                           className="bg-white/80 dark:bg-black/20" />
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
                                <FormLabel>{t("form.message")}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={t("form.messagePlaceholder")}
                                        className="min-h-37.5 bg-white/80 dark:bg-black/20"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-gray-900
                    dark:bg-white dark:text-black hover:bg-gray-800">
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        {t("form.submit")}
                    </Button>
                </form>
            </Form>
        </Card>
    );
}