import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'tr', 'de', 'ru','es'],

    // Used when no locale matches
    defaultLocale: 'en',

    // Optional: prefixes (always show /en or hide it for default?)
    localePrefix: 'always'
});
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);