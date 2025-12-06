import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import de from "@/locales/de.json";

export const SUPPORTED_LOCALES = ["en", "de"];
export const DEFAULT_LOCALE = "en";

const messages = {
	en,
	de,
};

export function setupI18n(locale = DEFAULT_LOCALE) {
	return createI18n({
		legacy: false,
		globalInjection: true,
		locale,
		fallbackLocale: DEFAULT_LOCALE,
		messages,
	});
}

const i18n = setupI18n();

export default i18n;
