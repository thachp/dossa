import gql from "graphql-tag";
import { AuthProvider } from "react-admin";

import gclient from "./graphql.config";

interface AuthSession {
    sessionToken: string;
    userID: string;
    username: string;
}

const LOGIN = gql`
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

const authProvider: AuthProvider = {
    login: ({ username, password }) => {
        // fetch user and set token
        const doLogin = async () => {
            const { data } = await gclient.mutate({
                mutation: LOGIN,
                variables: { input: { username, password } }
            });

            if (!data) {
                return Promise.reject();
            }

            const authSession: AuthSession = {
                sessionToken: data.logIn.viewer.sessionToken,
                userID: data.logIn.viewer.user.id,
                username: data.logIn.viewer.user.username
            };

            // set the token in local storage
            localStorage.setItem("auth-token", JSON.stringify(authSession));
            return Promise.resolve();
        };

        return doLogin();
    },
    logout: () => {
        localStorage.removeItem("auth-token");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => (localStorage.getItem("auth-token") ? Promise.resolve() : Promise.reject()),
    getPermissions: () => Promise.reject("Unknown method"),
    getIdentity: () => {
        const user = localStorage.getItem("auth-token");
        const userObj = user ? JSON.parse(user) : null;

        if (!userObj) {
            return Promise.reject();
        }

        return Promise.resolve({
            ...userObj,
            fullName: userObj.username
        });
    }
};

export default authProvider;
