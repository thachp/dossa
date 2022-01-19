import { Card as MuiCard, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ContactsIcon from "@material-ui/icons/Contacts";
import FilterBAndWIcon from "@material-ui/icons/FilterBAndW";
import GroupIcon from "@material-ui/icons/Group";
import inflection from "inflection";
import { FilterList, FilterListItem, FilterLiveSearch, useGetList } from "react-admin";

import { IncidentType } from "../../types";

const Card = withStyles((theme) => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            order: -1,
            marginRight: "1em"
        }
    }
}))(MuiCard);

const Aside = () => {
    const { data, ids } = useGetList<IncidentType>(
        "incidentTypes",
        { page: 1, perPage: 10 },
        { field: "name", order: "ASC" },
        {}
    );

    return (
        <Card>
            <CardContent>
                <FilterLiveSearch />
                <FilterList label="resources.institutions.filters.incidentTypes" icon={<FilterBAndWIcon />}>
                    {ids &&
                        data &&
                        ids.map((id: any) => (
                            <FilterListItem
                                label={inflection.humanize(data[id].name)}
                                key={data[id].id}
                                value={{
                                    incidentTypes: {
                                        have: {
                                            id: {
                                                equalTo: data[id].id
                                            }
                                        }
                                    }
                                }}
                            />
                        ))}
                </FilterList>

                <FilterList label="resources.institutions.filters.cases_count" icon={<ContactsIcon />}>
                    <FilterListItem label="ra.boolean.true" value={{ cases: { exists: true } }} />
                    <FilterListItem label="ra.boolean.false" value={{ cases: { exists: false } }} />
                </FilterList>

                <FilterList label="resources.institutions.filters.has_people" icon={<GroupIcon />}>
                    <FilterListItem label="ra.boolean.true" value={{ people: { exists: true } }} />
                    <FilterListItem label="ra.boolean.false" value={{ people: { exists: false } }} />
                </FilterList>
            </CardContent>
        </Card>
    );
};
export default Aside;
