import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Logout, UserMenu, useTranslate } from "react-admin";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    logo: {
        width: 50,
        height: 43.54
    }
});

const Header = () => {
    const classes = useStyles();
    const match = useRouteMatch(["/", "/institutions", "/reporting"]);
    const currentPath = match?.path ?? "/";
    const t = useTranslate();

    return (
        <nav className={classes.root}>
            <AppBar color="primary" position="static">
                <Toolbar variant="dense" color="primary">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box display="flex">
                            <Tabs value={currentPath} aria-label="Navigation Tabs">
                                <Tab label={"Dashboard"} component={Link} to="/" value="/" />
                                <Tab label={"Institutions"} component={Link} to="/institutions" value="/institutions" />
                                <Tab label={"Reporting"} component={Link} to="/reporting" value="/reporting" />
                            </Tabs>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <Typography component="span" variant="h5">
                                {t("app.title")}
                            </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <UserMenu logout={<Logout button />} />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;
