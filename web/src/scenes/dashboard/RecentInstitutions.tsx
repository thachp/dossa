import { Box, Button, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BusinessIcon from "@material-ui/icons/Business";
import { formatDistance } from "date-fns";
import { RecordMap, useTranslate } from "react-admin";
import { Link } from "react-router-dom";

import CardWithIcon from "../../components/cards/CardWithIcon";
import { Institution } from "../../types";

interface Props {
    institutions?: RecordMap<Institution>;
}

const RecentInstitutions = ({ institutions: _institutions = {} }: Props) => {
    const classes = useStyles();
    const translate = useTranslate();
    const institutions = Object.values(_institutions);
    return (
        <CardWithIcon icon={BusinessIcon} subtitle={translate("pos.dashboard.recent_institutions")}>
            <List>
                {institutions.map((record: any) => (
                    <ListItem key={record.id} button alignItems="flex-start">
                        <ListItemAvatar>
                            <BusinessIcon color="primary" fontSize="large" />
                        </ListItemAvatar>

                        <div>
                            <ListItemText
                                secondary={record.name}
                                className={classes.linkContent}
                                style={{ paddingRight: 0 }}
                            />

                            <ListItemText
                                secondary={record.description}
                                className={classes.linkContent}
                                style={{ paddingRight: 0 }}
                            />
                        </div>

                        <ListItemText
                            secondary={formatDistance(new Date(record.createdAt), new Date(), { addSuffix: true })}
                            className={classes.listItemText}
                            style={{ paddingRight: 0 }}
                        />
                    </ListItem>
                ))}
            </List>
            <Button className={classes.link} component={Link} to="/institutions" size="small" color="primary">
                <Box p={1} className={classes.linkContent}>
                    {translate("pos.dashboard.all_institutions")}
                </Box>
            </Button>
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

export default RecentInstitutions;
