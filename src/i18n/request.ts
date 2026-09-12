import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import fs from 'fs';
import path from 'path';

async function loadMessages(locale: string) {
    const dir = path.join(process.cwd(), 'src' ,'i18n', 'messages', locale);
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

    const messages: Record<string, any> = {};

    await Promise.all(
        files.map(async (file) => {
            const namespace = file.replace('.json', '');
            const mod = await import(`./messages/${locale}/${file}`);
            messages[namespace] = mod.default;
        })
    );

    return messages;
}

export default getRequestConfig(async ({requestLocale}) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: await loadMessages(locale)
    };
});