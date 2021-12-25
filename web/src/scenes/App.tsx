import polyglotI18nProvider from "ra-i18n-polyglot";
import { Admin, Resource, useTranslate } from "react-admin";

import authProvider from "../common/auth.provider";
import dataProvider from "../common/data.provider";
import englishMessages from "../common/i18n/en";
import Layout from "../components/Layout";
import Login from "./auth/Login.auth";
import cases from "./cases";
import { Dashboard } from "./dashboard";
import incidentTypes from "./incidentTypes";
import institutions from "./institutions";
import reviews from "./reviews";

const i18nProvider = polyglotI18nProvider((locale) => {
    if (locale === "fr") {
        return import("../common/i18n/fr").then((messages) => messages.default);
    }
    return englishMessages;
}, "en");

const App = () => {
    const translate = useTranslate();
    return (
        <Admin
            title={translate("app.title")}
            dataProvider={dataProvider}
            authProvider={authProvider}
            dashboard={Dashboard}
            loginPage={Login}
            layout={Layout}
            i18nProvider={i18nProvider}
            disableTelemetry
        >
            <Resource name="cases" {...cases} />
            <Resource name="incidentTypes" {...incidentTypes} />
            <Resource name="institutions" {...institutions} />
            <Resource name="reviews" {...reviews} />
        </Admin>
    );
};

export default App;
