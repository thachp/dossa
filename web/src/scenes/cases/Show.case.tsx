import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { FieldProps, ReferenceField, TextField, useShowController } from "react-admin";

import { Customer, Invoice } from "../../types";

const CustomerField = ({ record }: FieldProps<Customer>) =>
    record ? (
        <Typography>
            {record.first_name} {record.last_name}
            <br />
            {record.address}
            <br />
            {record.city}, {record.zipcode}
        </Typography>
    ) : null;

const CaseShow = (props: any) => {
    const { record } = useShowController<Invoice>(props);
    const classes = useStyles();

    if (!record) return null;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom>
                            Posters Galore
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="right">
                            Invoice {record.id}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} container alignContent="flex-end">
                        <ReferenceField
                            resource="invoices"
                            reference="customers"
                            source="customer_id"
                            basePath="/invoices"
                            record={record}
                            link={false}
                        >
                            <CustomerField />
                        </ReferenceField>
                    </Grid>
                </Grid>
                <div className={classes.spacer}>&nbsp;</div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom align="center">
                            Date{' '}
                        </Typography>
                        <Typography gutterBottom align="center">
                            {new Date(record.date).toLocaleDateString()}
                        </Typography>
                    </Grid>

                    <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom align="center">
                            Order
                        </Typography>
                        <ReferenceField
                            resource="invoices"
                            reference="commands"
                            source="command_id"
                            basePath="/invoices"
                            record={record}
                            link={false}
                        >
                            <TextField
                                source="reference"
                                align="center"
                                component="p"
                                gutterBottom
                            />
                        </ReferenceField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CaseShow;

const useStyles = makeStyles({
    root: { width: 600, margin: 'auto' },
    spacer: { height: 20 },
    invoices: { margin: '10px 0' },
});