export default function RecaptchaDisclosure() {
    return (
        <p className="text-[11px] leading-relaxed text-gray-400 text-center">
            This site is protected by reCAPTCHA and the Google{" "}
            <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-gray-600"
            >
                Privacy Policy
            </a>{" "}
            and{" "}
            <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-gray-600"
            >
                Terms of Service
            </a>{" "}
            apply.
        </p>
    );
}