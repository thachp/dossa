import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation signUp($input: SignUpInput!) {
        signUp(input: $input) {
            viewer {
                sessionToken
                user {
                    id
                    username
                }
            }
        }
    }
`;

export const SIGN_IN = gql`
    mutation login($input: LogInInput!) {
        logIn(input: $input) {
            viewer {
                sessionToken
                user {
                    id
                    username
                }
            }
        }
    }
`;
