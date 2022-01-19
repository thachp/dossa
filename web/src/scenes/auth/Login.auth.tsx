import { Button, Card, CardActions, CircularProgress, createTheme, Divider, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useState } from "react";
import { Notification, useLogin, useNotify, useTranslate } from "react-admin";
import { Field, withTypes } from "react-final-form";
import { QRCode } from "react-qrcode-logo";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { lightTheme } from "../../common/themes";

const useStyles = makeStyles((theme) => {
    return {
        avatar: {
            margin: "1em",
            display: "flex",
            justifyContent: "center"
        },
        hint: {
            marginTop: "1em",
            display: "flex",
            justifyContent: "center",
            color: theme.palette.grey[500]
        },
        form: {
            padding: "0 1em 1em 1em"
        },
        input: {
            marginTop: "1em"
        },
        actions: {
            padding: "0 1em 1em 1em"
        }
    };
});

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
        autoComplete="off"
    />
);

interface FormValues {
    username?: string;
    password?: string;
}

const { Form } = withTypes<FormValues>();

interface LoginAuthProps {
    authProvider: Function;
    previousRoute: string;
}

const LoginAuth: React.FC<LoginAuthProps> = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation<{ nextPathname: string } | null>();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);
        login(auth, location.state ? location.state.nextPathname : "/").catch((error: Error) => {
            setLoading(false);
            notify(
                typeof error === "string"
                    ? error
                    : typeof error === "undefined" || !error.message
                    ? "ra.auth.sign_in_error"
                    : error.message,
                "warning",
                {
                    _: typeof error === "string" ? error : error && error.message ? error.message : undefined
                }
            );
        });
    };

    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!values.username) {
            errors.username = translate("ra.validation.required");
        }
        if (!values.password) {
            errors.password = translate("ra.validation.required");
        }
        return errors;
    };

    const uuid = uuidv4();

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex bg-gray-700 flex-col justify-center items-center h-screen">
                        <Card>
                            <div className="bg-gray-300 py-2">
                                <h1 className="text-2xl font-bold text-center text-gray-500">
                                    {translate("auth.title")}
                                </h1>
                            </div>
                            <Divider />
                            <div className={classes.hint}>{translate("auth.sign_in")}</div>
                            <div className={classes.avatar}>
                                <QRCode size={100} value={`exp://app.dossa.network/login?redirect=${uuid}`} />
                            </div>
                            <Divider />
                            <div className={classes.form}>
                                <div className={classes.hint}>{translate("auth.or_continue")}</div>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="username"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={translate("auth.username")}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // @ts-ignore
                                        component={renderInput}
                                        label={translate("auth.password")}
                                        type="password"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <CardActions className={classes.actions}>
                                <Button variant="contained" type="submit" color="primary" disabled={loading} fullWidth>
                                    {loading && <CircularProgress size={25} thickness={2} />}
                                    {translate("auth.connect")}
                                </Button>
                            </CardActions>
                        </Card>
                        <Notification />
                    </div>
                </form>
            )}
        />
    );
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props: any) => (
    <ThemeProvider theme={createTheme(lightTheme)}>
        <LoginAuth {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
