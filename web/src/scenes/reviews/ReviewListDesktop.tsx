import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import { Datagrid, DatagridProps, DateField, Identifier, TextField } from "react-admin";

import rowStyle from "./rowStyle";
import StarRatingField from "./StarRatingField";


const useListStyles = makeStyles({
    headerRow: {
        borderLeftColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
    },
    headerCell: {
        padding: '6px 8px 6px 8px',
    },
    rowCell: {
        padding: '6px 8px 6px 8px',
    },
    comment: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

export interface ReviewListDesktopProps extends DatagridProps {
    selectedRow?: Identifier;
}

const ReviewListDesktop = ({
    selectedRow,
    ...props
}: ReviewListDesktopProps) => {
    const classes = useListStyles();
    return (
        <Datagrid
            rowClick="edit"
            // @ts-ignore
            rowStyle={rowStyle(selectedRow)}
            classes={{
                headerRow: classes.headerRow,
                headerCell: classes.headerCell,
                rowCell: classes.rowCell,
            }}
            optimized
            {...props}
        >
            <DateField source="date" />
            <StarRatingField size="small" />
            <TextField source="comment" cellClassName={classes.comment} />
            <TextField source="status" />
        </Datagrid>
    );
};

export default ReviewListDesktop;