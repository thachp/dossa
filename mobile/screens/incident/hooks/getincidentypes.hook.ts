import { gql } from "@apollo/client";

export const GETINCIDENTTYPES_LIST = gql`
    query getIncidentTypes {
        incidentTypes(order: name_ASC) {
            pageInfo {
                startCursor
                endCursor
            }
            count
            edges {
                node {
                    id
                    name
                    description
                }
            }
        }
    }
`;
