import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { DashboardMenuItem, MenuItemLink, MenuProps, ReduxState, useTranslate } from "react-admin";
import { useSelector } from "react-redux";

import dashboard from "../scenes/dashboard";
import institutions from "../scenes/institutions";
import { AppState } from "../types";

const Menu = ({ dense = false }: MenuProps) => {
    const translate = useTranslate();
    const open = useSelector((state: ReduxState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change
    const classes = useStyles();

    return (
        <div
            className={classnames(classes.root, {
                [classes.open]: open,
                [classes.closed]: !open
            })}
        >
            <DashboardMenuItem />

            <MenuItemLink
                to={{
                    pathname: "/institutions",
                    state: { _scrollToTop: true }
                }}
                primaryText={translate(`resources.institutions.name`, {
                    smart_count: 2
                })}
                leftIcon={<institutions.icon />}
                dense={dense}
            />

            <MenuItemLink
                to={{
                    pathname: "/reporting",
                    state: { _scrollToTop: true }
                }}
                primaryText={translate(`resources.reporting.title`, {
                    smart_count: 2
                })}
                leftIcon={<dashboard.Icon />}
                dense={dense}
            />
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    open: {
        width: 200
    },
    closed: {
        width: 100
    }
}));

export default Menu;
