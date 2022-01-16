import { Box, Card, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { createElement, FC } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import cartouche from "./cartouche.png";
import cartoucheDark from "./cartoucheDark.png";

interface Props {
    icon: FC<any>;
    to?: string;
    title?: string;
    subtitle?: string | number;
    children?: ReactNode;
}

const useStyles = makeStyles((theme) => ({
    card: {
        minHeight: 52,
        display: "flex",
        flexDirection: "column",
        flex: "1",
        "& a": {
            textDecoration: "none",
            color: "inherit"
        }
    },
    main: () => ({
        overflow: "inherit",
        padding: 16,
        background: `url(${theme.palette.type === "dark" ? cartoucheDark : cartouche}) no-repeat`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& .icon": {
            color: theme.palette.type === "dark" ? "inherit" : "#dc2440"
        }
    }),
    title: {}
}));

const CardWithIcon = (props: Props) => {
    const { icon, title, subtitle, to = "", children } = props;
    const classes = useStyles(props);
    return (
        <Card className={classes.card}>
            <Link to={to}>
                <div className={classes.main}>
                    <Box width="3em" className="icon">
                        {createElement(icon, { fontSize: "large", color: "black" })}
                    </Box>
                    <Box textAlign="right">
                        <Typography className={classes.title} color="textPrimary">
                            {title}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {subtitle || " "}
                        </Typography>
                    </Box>
                </div>
            </Link>
            {children && <Divider />}
            {children}
        </Card>
    );
};

export default CardWithIcon;
