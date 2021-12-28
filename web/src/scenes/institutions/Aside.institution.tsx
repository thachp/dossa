import { Card as MuiCard, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ContactsIcon from "@material-ui/icons/Contacts";
import FilterBAndWIcon from "@material-ui/icons/FilterBAndW";
import GroupIcon from "@material-ui/icons/Group";
import inflection from "inflection";
import { FilterList, FilterListItem, FilterLiveSearch, useGetList } from "react-admin";

import { IncidentType } from "../incidentTypes/incidentTypes.interface";

const Card = withStyles((theme) => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            order: -1,
            width: "20em",
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
                <FilterLiveSearch source="name_matchesRegex" />

                <FilterList label="resources.institutions.filters.incidentTypes" icon={<FilterBAndWIcon />}>
                    {ids &&
                        data &&
                        ids.map((id: any) => (
                            <FilterListItem
                                label={inflection.humanize(data[id].name)}
                                key={data[id].id}
                                value={{ category_id: data[id].id }}
                            />
                        ))}
                </FilterList>

                <FilterList label="resources.institutions.filters.cases_count" icon={<ContactsIcon />}>
                    <FilterListItem label="resources.institutions.filters.zero_10" value={{ cases_0to10: false }} />
                    <FilterListItem label="resources.institutions.filters.ten_25" value={{ cases_10to25: false }} />
                    <FilterListItem
                        label="resources.institutions.filters.twentyfive_50"
                        value={{ cases_25to50: false }}
                    />
                    <FilterListItem label="resources.institutions.filters.fifty_more" value={{ cases_50more: false }} />
                </FilterList>

                <FilterList label="resources.institutions.filters.has_people" icon={<GroupIcon />}>
                    <FilterListItem label="ra.boolean.true" value={{ has_people: true }} />
                    <FilterListItem label="ra.boolean.false" value={{ has_people: false }} />
                </FilterList>
            </CardContent>
        </Card>
    );
};
export default Aside;
