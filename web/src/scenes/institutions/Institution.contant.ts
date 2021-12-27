import { gql } from "graphql-tag";

const FRAGMENT_INSTITUTIONDETAIL = gql`
    fragment InstitutionDetail on Institution {
        id
        name
        description
        telephone
        email
    }
`;

const GET_LIST = gql`
    ${FRAGMENT_INSTITUTIONDETAIL}
    query getList($where: InstitutionWhereInput, $order: [InstitutionOrder!], $take: Int, $skip: Int) {
        institutions(where: $where, order: $order, first: $take, skip: $skip) {
            count
            edges {
                node {
                    ...InstitutionDetail
                }
            }
        }
    }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    GET_LIST
};
