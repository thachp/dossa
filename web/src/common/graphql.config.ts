import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const { REACT_APP_APPLICATION_ID, REACT_APP_JAVASCRIPT_KEY } = process.env;

const user = localStorage.getItem("auth-token");
const userObj = user ? JSON.parse(user) : null;

const headers: any = {
    "X-Parse-Application-Id": REACT_APP_APPLICATION_ID,
    "X-Parse-Javascript-Key": REACT_APP_JAVASCRIPT_KEY
};

if (userObj && userObj.sessionToken) {
    headers["X-Parse-Session-Token"] = userObj.sessionToken;
}

// Initialize Apollo Client
export const gclient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: "https://api.dossa.network/graphql",
        headers
    }) as any
});

export default gclient;
