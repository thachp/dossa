import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { AppBar, useTranslate } from "react-admin";

const useStyles = makeStyles({
    root: {
        border: "0px solid #FFFFFF"
    },
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
        <AppBar {...props} color="primary" elevation={0} className={classes.root}>
            <Typography variant="h6" color="inherit" className={classes.title} id="react-admin-title" />
            <div className="font-bold">{t("app.title")} </div>
            <span className={classes.spacer} />
        </AppBar>
    );
};

export default CustomAppBar;
