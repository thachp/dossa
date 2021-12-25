import { gql } from "@apollo/client";

export const CHECK_VPN = gql`
    mutation {
        hasVPN
    }
`;

export const CREATE_FILE = gql`
    mutation createFile($input: CreateFileInput!) {
        createFile(input: $input) {
            fileInfo {
                name
                url
            }
        }
    }
`;

export const CREATE_ASSET = gql`
    mutation createAsset($input: CreateAssetInput!) {
        createAsset(input: $input) {
            asset {
                id
            }
        }
    }
`;

export const CREATE_INCIDENT = gql`
    mutation createIncident(
        $incidentType: ID!
        $description: String!
        $tags: HashtagRelationInput
        $institutions: [ID!]
        $assets: AssetRelationInput
    ) {
        createIncident(
            input: {
                fields: {
                    incidentType: { link: $incidentType }
                    description: $description
                    tags: $tags
                    assets: $assets
                    institutions: { add: $institutions }
                }
            }
        ) {
            incident {
                id
                description
            }
        }
    }
`;

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
