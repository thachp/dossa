import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppBar, useTranslate } from "react-admin";

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    spacer: {
        flex: 1
    }
});

const CustomAppBar = (props: any) => {
    const classes = useStyles();
    const t = useTranslate();
    return (
        <AppBar {...props} elevation={1}>
            <Typography variant="h6" color="inherit" className={classes.title} id="react-admin-title" />
            <div>{t("app.title")} </div>
            <span className={classes.spacer} />
        </AppBar>
    );
};

export default CustomAppBar;
