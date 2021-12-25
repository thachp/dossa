import { gql } from "@apollo/client";

export const GET_INSTITUTIONS_LIST = gql`
    query getInstitutionsList {
        institutions(order: name_ASC, first: 8) {
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

export const SEARCH_INSTITUTIONS_LIST = gql`
    query getInstitutionsList($where: InstitutionWhereInput) {
        institutions(where: $where, order: name_ASC, first: 8) {
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
