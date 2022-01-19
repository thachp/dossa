import { Datagrid, DateField, List, ListProps, Pagination, PaginationProps, TextField, useTranslate } from "react-admin";

const IncidentPagination = (props: PaginationProps) => <Pagination rowsPerPageOptions={[10, 15, 30, 100]} {...props} />;

const ListInstitution = (props: ListProps) => {
    const translate = useTranslate();

    return (
        <List
            {...props}
            sort={{ field: "createdAt", order: "DESC" }}
            syncWithLocation
            bulkActionButtons={true}
            pagination={<IncidentPagination />}
            perPage={15}
        >
            <Datagrid>
                <TextField
                    sortable={false}
                    label={translate("resources.incidents.incident_types", 1)}
                    source="incidentType.name"
                />
                <TextField source="description" />
                <DateField showTime source="createdAt" />
            </Datagrid>
        </List>
    );
};

export default ListInstitution;
