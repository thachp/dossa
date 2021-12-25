import ThumbUp from "@material-ui/icons/ThumbUp";
import PropTypes from "prop-types";
import * as React from "react";
import {
    BulkActionProps,
    Button,
    CRUD_UPDATE_MANY,
    Identifier,
    useNotify,
    useRefresh,
    useUnselectAll,
    useUpdateMany,
} from "react-admin";

const noSelection: Identifier[] = [];

const BulkAcceptButton = (props: BulkActionProps) => {
    const { selectedIds = noSelection } = props;
    const notify = useNotify();
    const refresh = useRefresh();
    const unselectAll = useUnselectAll('reviews');

    const [approve, { loading }] = useUpdateMany(
        'reviews',
        selectedIds,
        { status: 'accepted' },
        {
            action: CRUD_UPDATE_MANY,
            undoable: true,
            onSuccess: () => {
                notify(
                    'resources.reviews.notification.approved_success',
                    'info',
                    {},
                    true
                );
                refresh();
                unselectAll();
            },
            onFailure: () => {
                notify(
                    'resources.reviews.notification.approved_error',
                    'warning'
                );
            },
        }
    );

    return (
        <Button
            label="resources.reviews.action.accept"
            onClick={approve}
            disabled={loading}
        >
            <ThumbUp />
        </Button>
    );
};

BulkAcceptButton.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BulkAcceptButton;
