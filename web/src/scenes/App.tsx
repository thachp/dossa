import polyglotI18nProvider from "ra-i18n-polyglot";
import { Admin, Resource, useTranslate } from "react-admin";
import { Route } from "react-router";

import englishMessages from "../common/i18n/en";
import { darkTheme } from "../common/themes";
import Layout from "../components/Layout";
import authProvider from "./auth.provider";
import Login from "./auth/Login.auth";
import dashboard from "./dashboard";
import dataProvider from "./data.provider";
import incidents from "./incidents";
import institutions from "./institutions";
import reporting from "./reporting/Reporting";

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
            theme={darkTheme}
            dataProvider={dataProvider}
            authProvider={authProvider}
            loginPage={Login}
            dashboard={dashboard.Dashboard}
            layout={Layout}
            customRoutes={[<Route path="/reporting" component={reporting} />]}
            i18nProvider={i18nProvider}
            disableTelemetry
        >
            <Resource name="institutions" {...institutions} />
            <Resource name="incidentTypes" />
            <Resource name="incidents" {...incidents} />
        </Admin>
    );
};

export default App;
