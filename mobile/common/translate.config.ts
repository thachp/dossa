import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { en } from "./locales/en.locale";
import { es } from "./locales/es.locale";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en,
    es
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export const t = (scope: I18n.Scope, options?: I18n.TranslateOptions | undefined): string => {
    return i18n.t(scope, options);
};

export default t;
