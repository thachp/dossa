import { Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import inflection from "inflection";
import * as React from "react";
import { EditButton, List, ListProps, useListContext } from "react-admin";

import { IncidentType } from "../../types";

const useStyles = makeStyles({
    root: {
        marginTop: "1em"
    },
    media: {
        height: 140
    },
    title: {
        paddingBottom: "0.5em"
    },
    actionSpacer: {
        display: "flex",
        justifyContent: "space-around"
    }
});

const IncidentTypeGrid = (props: any) => {
    const classes = useStyles(props);
    const { data, ids } = useListContext<IncidentType>();
    return ids ? (
        <Grid container spacing={2} className={classes.root}>
            {ids.map((id) => (
                <Grid key={id} xs={12} sm={6} md={4} lg={3} xl={2} item>
                    <Card>
                        <CardMedia
                            image={`https://marmelab.com/posters/${data[id].name}-1.jpeg`}
                            className={classes.media}
                        />
                        <CardContent className={classes.title}>
                            <Typography variant="h5" component="h2" align="center">
                                {inflection.humanize(data[id].name)}
                            </Typography>
                        </CardContent>
                        <CardActions classes={{ spacing: classes.actionSpacer }}>
                            <EditButton basePath="/categories" record={data[id]} />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    ) : null;
};

const IncidentTypeList = (props: ListProps) => (
    <List
        {...props}
        sort={{ field: "name", order: "ASC" }}
        perPage={20}
        pagination={false}
        component="div"
        actions={false}
    >
        <IncidentTypeGrid />
    </List>
);

export default IncidentTypeList;
