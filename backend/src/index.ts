import * as express from "express";
import * as path from "path";

const { default: ParseServer, ParseGraphQLServer } = require("parse-server");
const ParseDashboard = require("parse-dashboard");
const FSFilesAdapter = require("@parse/fs-files-adapter");
const gql = require("graphql-tag");
const fs = require("fs");
const customSchema = fs.readFileSync(path.resolve(__dirname, "../src/schema.graphql"));
// parse .env file
require("dotenv-flow").config({
    path: `${__dirname}/../../`
});

const {
    APPLICATION_ID,
    ENVIRONMENT,
    APP_NAME,
    MASTER_KEY,
    JAVASCRIPT_KEY,
    FILES_SUBDIRECTORY,
    ENCRYPTION_KEY,
    MONGODB_URL,
    GRAPHQL_SERVERURL,
    SERVER_URL
} = process.env;

// Create express app
const app = express();

// Create a Parse Server Instance
const parseServer = new ParseServer({
    appId: APPLICATION_ID,
    masterKey: MASTER_KEY,
    javascriptKey: JAVASCRIPT_KEY,
    databaseURI: MONGODB_URL,
    serverURL: SERVER_URL,
    publicServerURL: SERVER_URL,
    cloud: path.resolve(__dirname, "../build/cloud/main.js"),
    filesAdapter: new FSFilesAdapter({
        filesSubDirectory: FILES_SUBDIRECTORY,
        encryptionKey: ENCRYPTION_KEY
    }),
    allowClientClassCreation: false,
    enableAnonymousUsers: false
});

var dashboard = new ParseDashboard(
    {
        apps: [
            {
                appName: APP_NAME,
                appId: APPLICATION_ID,
                masterKey: MASTER_KEY,
                graphQLServerURL: GRAPHQL_SERVERURL,
                serverURL: SERVER_URL
            }
        ]
    },
    { allowInsecureHTTP: ENVIRONMENT === "development" }
);

// Create the GraphQL Server Instance
const parseGraphQLServer = new ParseGraphQLServer(parseServer, {
    graphQLPath: "/graphql",
    playgroundPath: "/playground",
    graphQLCustomTypeDefs: gql`
        ${customSchema}
    `
});

// Mounts the REST API
// This is needed for the Administration Panel to work
app.use("/parse", parseServer.app);

// Mounts the GraphQL API using graphQLPath: '/graphql'
parseGraphQLServer.applyGraphQL(app);

// Mounts the GraphQL Playground - do NOT use in Production
// ONLY use in development mode

if (ENVIRONMENT === "development") {
    app.use("/administration", dashboard);
    parseGraphQLServer.applyPlayground(app);
}

// Start the server
app.listen(1337, function() {
    console.log("REST API running on http://localhost:1337/parse");

    if (ENVIRONMENT === "development") {
        console.log("Administration running on http://localhost:1337/administration");
        console.log("GraphQL Playground running on http://localhost:1337/playground");
    }

    console.log("GraphQL API running on http://localhost:1337/graphql");
});
