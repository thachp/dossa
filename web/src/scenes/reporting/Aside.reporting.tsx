import { Card as MuiCard, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FilterBAndWIcon from "@material-ui/icons/FilterBAndW";
import inflection from "inflection";
import { FilterList, FilterListItem, useGetList } from "react-admin";

import { IncidentType } from "./incidentTypes.interface";

const Card = withStyles((theme) => ({
    root: {
        [theme.breakpoints.up("sm")]: {
            order: 1,
            marginLeft: "1em"
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
            </CardContent>
        </Card>
    );
};
export default Aside;
