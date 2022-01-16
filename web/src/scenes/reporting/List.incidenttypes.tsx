import { Datagrid, List, ListProps, TextField, useTranslate } from "react-admin";

import AsideInstitution from "./Aside.reporting";

const ListIncidentTypes = (props: ListProps) => {
    const translate = useTranslate();

    return (
        <List
            title={translate("resources.reporting.title")}
            {...props}
            sort={{ field: "name", order: "ASC" }}
            syncWithLocation
            pagination={false}
            bulkActionButtons={false}
            aside={<AsideInstitution />}
        >
            <Datagrid>
                <TextField source="name" />
                <TextField source="description" />
                <TextField source="incidents" />
            </Datagrid>
        </List>
    );
};

export default ListIncidentTypes;
