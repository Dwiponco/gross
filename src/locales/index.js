import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { themeConfig } from "configs/theme.config";

i18n.use(initReactI18next).init({
  fallbackLng: themeConfig.locale,
  lng: themeConfig.locale,
  interpolation: {
    escapeValue: false,
  },
});

export const dateLocales = {
  en: () => import("dayjs/locale/en"),
  es: () => import("dayjs/locale/es"),
  zhCn: () => import("dayjs/locale/zh-cn"),
  ar: () => import("dayjs/locale/ar"),
};

export default i18n;
