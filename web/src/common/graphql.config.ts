import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const { REACT_APP_APPLICATION_ID, REACT_APP_JAVASCRIPT_KEY } = process.env;

const authLink = setContext((_, { headers: _headers }) => {
    // get the authentication token from local storage if it exists
    const user = localStorage.getItem("auth-token");
    const userObj = user ? JSON.parse(user) : null;

    const headers: any = {
        ..._headers,
        "X-Parse-Application-Id": REACT_APP_APPLICATION_ID,
        "X-Parse-Javascript-Key": REACT_APP_JAVASCRIPT_KEY
    };

    if (userObj && userObj.sessionToken) {
        headers["X-Parse-Session-Token"] = userObj.sessionToken;
    }

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers
        }
    };
});

// Initialize Apollo Client
export const gclient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(createUploadLink({ uri: "https://api.dossa.network/graphql" }))
});

export default gclient;
