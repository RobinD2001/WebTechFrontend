import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

export const SUPPORTED_LOCALES = ["en", "de"];
export const DEFAULT_LOCALE = "en";

const messages = {
	en,
	de,
};

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: DEFAULT_LOCALE,
	fallbackLocale: DEFAULT_LOCALE,
	messages,
});

export default i18n;
