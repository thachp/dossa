import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const { REACT_APP_APPLICATION_ID, REACT_APP_JAVASCRIPT_KEY } = process.env;

// Initialize Apollo Client
export const gclient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: "/graphql",
        headers: {
            "X-Parse-Application-Id": REACT_APP_APPLICATION_ID,
            "X-Parse-Javascript-Key": REACT_APP_JAVASCRIPT_KEY
        }
    }) as any
});

export default gclient;
