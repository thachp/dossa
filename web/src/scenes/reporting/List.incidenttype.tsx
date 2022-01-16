import { List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalanceOutlined";
import * as React from "react";
import { RecordMap, useTranslate } from "react-admin";

import CardWithIcon from "../../components/cards/CardWithIcon";
import { Incident } from "../../types";

interface Props {
    incidents?: RecordMap<Incident>;
    nb?: number;
}

const ListIncidentType = ({ incidents: _incidents = {} }: Props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const incidents = Object.values(_incidents);
    return (
        <CardWithIcon icon={AccountBalanceIcon} subtitle={translate("resources.reporting.list_incident_types")}>
            <List>
                {incidents.map((record: any) => (
                    <ListItem key={record.id} button alignItems="flex-start">
                        <ListItemAvatar>
                            <AccountBalanceIcon color="primary" fontSize="large" />
                        </ListItemAvatar>
                        <div>
                            <ListItemText
                                primary={record.name}
                                secondary={record.description}
                                className={classes.linkContent}
                                style={{ paddingRight: 0 }}
                            />
                        </div>
                    </ListItem>
                ))}
            </List>
        </CardWithIcon>
    );
};

const useStyles = makeStyles((theme) => ({
    avatar: {
        background: theme.palette.background.paper
    },
    listItemText: {
        overflowY: "hidden",
        textAlign: "right",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical"
    },
    link: {
        borderRadius: 0
    },
    linkContent: {
        color: theme.palette.primary.main,
        overflow: "hidden"
    }
}));

export default ListIncidentType;
