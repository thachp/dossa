import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import {
    DateField,
    EditContextProvider,
    EditProps,
    SimpleForm,
    TextInput,
    useEditController,
    useTranslate,
} from "react-admin";

import { Review } from "../../types";
import ReviewEditToolbar from "./ReviewEditToolbar";
import StarRatingField from "./StarRatingField";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 40,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1em',
    },
    form: {
        [theme.breakpoints.up('xs')]: {
            width: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            marginTop: -30,
        },
    },
    inlineField: {
        display: 'inline-block',
        width: '50%',
    },
}));

interface Props extends EditProps {
    onCancel: () => void;
}

const ReviewEdit = ({ onCancel, ...props }: Props) => {
    const classes = useStyles();
    const controllerProps = useEditController<Review>(props);
    const translate = useTranslate();
    if (!controllerProps.record) {
        return null;
    }
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6">
                    {translate('resources.reviews.detail')}
                </Typography>
                <IconButton onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </div>
            <EditContextProvider value={controllerProps}>
                <SimpleForm
                    className={classes.form}
                    basePath={controllerProps.basePath}
                    record={controllerProps.record}
                    save={controllerProps.save}
                    version={controllerProps.version}
                    redirect="list"
                    resource="reviews"
                    toolbar={<ReviewEditToolbar />}
                >    
                    <DateField
                        source="date"
                        formClassName={classes.inlineField}
                    />
                    <StarRatingField formClassName={classes.inlineField} />
                    <TextInput
                        source="comment"
                        rowsMax={15}
                        multiline
                        fullWidth
                    />
                </SimpleForm>
            </EditContextProvider>
        </div>
    );
};

export default ReviewEdit;
