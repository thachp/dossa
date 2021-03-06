import { gql } from "graphql-tag";

const FRAGMENT_INCIDENTDETAIL = gql`
    fragment IncidentDetail on Incident {
        id
        description
        incidentType {
            id
            name
        }
        createdAt
        createdBy {
            id
        }
    }
`;

const GET_LIST = gql`
    ${FRAGMENT_INCIDENTDETAIL}
    query getList($where: IncidentWhereInput, $order: [IncidentOrder!], $take: Int, $skip: Int) {
        incidents(where: $where, order: $order, first: $take, skip: $skip) {
            count
            edges {
                node {
                    ...IncidentDetail
                }
            }
        }
    }
`;

const DELETE = gql`
    mutation deleteIncident($input: DeleteIncidentInput!) {
        deleteIncident(input: $input) {
            incident {
                id
            }
        }
    }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    GET_LIST,
    DELETE
};
