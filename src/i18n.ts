import { createI18n } from 'vue-i18n';
import { languages } from '@/locales';

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: import.meta.env.VITE_I18N_LOCALE || 'en',
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
    messages: Object.assign(languages),
});

export default i18n;
