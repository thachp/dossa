import { gql } from "graphql-tag";

const GET_LIST = gql`
    query getIncidentTypes {
        incidentTypes(order: name_ASC) {
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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    GET_LIST
};
