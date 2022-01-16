import { Layout, LayoutProps } from "react-admin";
import { useSelector } from "react-redux";

import { darkTheme, lightTheme } from "../common/themes";
import { AppState } from "../types";
import AppBar from "./AppBar";
import Menu from "./Menu";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: LayoutProps) => {
    const theme = useSelector((state: AppState) => (state.theme === "dark" ? darkTheme : lightTheme));
    return <Layout {...props} appBar={AppBar} menu={Menu} theme={theme} />;
};
