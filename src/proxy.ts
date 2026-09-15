import createMiddleware from 'next-intl/middleware';
import {routing} from "@/i18n/routing";
import {NextRequest, NextResponse} from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    const targetHost = "www.vstars.com.tr";
    const host = request.headers.get('host');

    const isDev = host?.includes('localhost') || host?.includes('.run.app');
    if (!isDev && host && host !== targetHost) {
        const url = new URL(request.url);
        url.host = targetHost;
        url.protocol = 'https';
        return NextResponse.redirect(url, 301);
    }
    return handleI18nRouting(request);
}

export const config = {
    matcher: [
        '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    ]
};