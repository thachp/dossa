import { List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import CommentIcon from "@material-ui/icons/Comment";
import { formatDistance } from "date-fns";
import * as React from "react";
import { RecordMap, useTranslate } from "react-admin";

import CardWithIcon from "../../components/cards/CardWithIcon";
import { Incident } from "../../types";

interface Props {
    incidents?: RecordMap<Incident>;
}

const RecentIncidents = ({ incidents: _incidents = {} }: Props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const incidents = Object.values(_incidents);
    return (
        <CardWithIcon icon={CommentIcon} subtitle={translate("pos.dashboard.recent_incidents")}>
            <List>
                {incidents.map((record: any) => (
                    <ListItem key={record.id} button alignItems="flex-start">
                        <ListItemAvatar>
                            <AssignmentIcon color="primary" fontSize="large" />
                        </ListItemAvatar>

                        <ListItemText
                            secondary={record.description}
                            className={classes.linkContent}
                            style={{ paddingRight: 0 }}
                        />

                        <ListItemText
                            secondary={formatDistance(new Date(record.createdAt), new Date(), { addSuffix: true })}
                            className={classes.listItemText}
                            style={{ paddingRight: 0 }}
                        />
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
        overflow: "hidden",
        maxWidth: "100ch"
    }
}));

export default RecentIncidents;
