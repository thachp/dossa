import { ApolloError, gql, useMutation } from "@apollo/client";
import { State } from "@hookstate/core";

import { GlobalState } from "../global.state";

export const REGISTER = gql`
    mutation register($input: SignUpInput!) {
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

export const LOGIN = gql`
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

export const useRegister = (global: State<GlobalState>) => {
    return useMutation(REGISTER, {
        onError: (error: ApolloError) => {
            console.error("register error", error.message);
        },
        onCompleted: (data: {
            signUp: {
                viewer: {
                    sessionToken: string;
                    user: {
                        id: string;
                        username: string;
                    };
                };
            };
        }) => {
            global.user.set(JSON.stringify(data.signUp.viewer));
        }
    });
};

export const useLogin = (global: State<GlobalState>) => {
    return useMutation(LOGIN, {
        onError: (error: ApolloError) => {
            console.error("login error", error.message);
        },

        onCompleted: (data: {
            logIn: {
                viewer: {
                    sessionToken: string;
                    user: {
                        id: string;
                        username: string;
                    };
                };
            };
        }) => {
            global.user.set(JSON.stringify(data.logIn.viewer));
        }
    });
};
