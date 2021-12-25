import * as React from "react";
import { Datagrid, DateField, DateInput, List, ListProps, NumberField, ReferenceField, TextField } from "react-admin";

import ShowIncident from "./Show.incident";

const listFilters = [
    <DateInput source="date_gte" alwaysOn />,
    <DateInput source="date_lte" alwaysOn />,
];



const ListIncident = (props: ListProps) => {
    return (
        <List
            {...props}
            filters={listFilters}
            perPage={25}
            sort={{ field: 'date', order: 'desc' }}
        >
            <Datagrid rowClick="expand" expand={<ShowIncident />}>
                <TextField source="id" />
                <DateField source="date" />
                <ReferenceField source="command_id" reference="commands">
                    <TextField source="reference" />
                </ReferenceField>
                <NumberField source="total_ex_taxes" />
                <NumberField source="delivery_fees" />
                <NumberField source="taxes" />
                <NumberField source="total" />
            </Datagrid>
        </List>
    );
};

export default ListIncident;
