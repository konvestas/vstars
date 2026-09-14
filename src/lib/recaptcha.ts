declare global {
    interface Window {
        grecaptcha: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, opts: { action: string }) => Promise<string>;
        };
    }
}

export function getRecaptchaToken(action: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined" || !window.grecaptcha) {
            reject(new Error("reCAPTCHA not loaded"));
            return;
        }
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, { action })
                .then(resolve)
                .catch(reject);
        });
    });
}