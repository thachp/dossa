import { Datagrid, List, ListProps, Pagination, PaginationProps, TextField } from "react-admin";

import AsideInstitution from "./Aside.institution";

const InstitutionPagination = (props: PaginationProps) => (
    <Pagination rowsPerPageOptions={[10, 20, 50, 100]} {...props} />
);

const ListInstitution = (props: ListProps) => {
    return (
        <List
            {...props}
            sort={{ field: "name", order: "ASC" }}
            syncWithLocation
            bulkActionButtons={false}
            pagination={<InstitutionPagination />}
            perPage={20}
            aside={<AsideInstitution />}
        >
            <Datagrid>
                <TextField source="name" />
                <TextField source="description" />
                <TextField source="email" />
                <TextField source="telephone" />
            </Datagrid>
        </List>
    );
};

export default ListInstitution;
