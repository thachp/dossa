import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

import { APPLICATION_ID, JAVASCRIPT_KEY, PARSE_GRAPHQL } from "./constants/settings.constant";

// Initialize Apollo Client
export const gclient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: PARSE_GRAPHQL,
        headers: {
            "X-Parse-Application-Id": APPLICATION_ID,
            "X-Parse-Javascript-Key": JAVASCRIPT_KEY
        }
    })
});

export default gclient;
