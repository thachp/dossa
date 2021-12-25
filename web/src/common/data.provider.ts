import { ApolloQueryResult } from "@apollo/client";
import gql from "graphql-tag";
import buildGraphQLProvider, { BuildQueryFactory } from "ra-data-graphql";
import { DataProvider, DELETE, GET_LIST } from "react-admin";

import gclient from "./graphql.config";

const getGqlResource = (resource: string) => {
    switch (resource) {
        case "cases":
            return "Case";

        case "incidents":
            return "Incident";

        case "users":
            return "User";

        case "reviews":
            return "Review";

        case "institutions":
            return "Institution";

        default:
            throw new Error(`Unknown resource ${resource}`);
    }
};

const customBuildQuery: BuildQueryFactory = (introspectionResults: any) => {
    return (raFetchtype: string, resourceName: string, params: any) => {
        const resource = introspectionResults.resources.find(
            (r: { type: { name: string } }) => r.type.name === resourceName
        );

        if (raFetchtype === GET_LIST) {
            console.log("fetching list", params);

            return {
                query: gql`
                    query {
                        institutions(order: name_ASC, first: 8) {
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
                `,
                variables: { id: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data[`remove${resource}`]) {
                        return { data: { id: params.id } };
                    }

                    throw new Error(`Could not delete ${resource}`);
                }
            };
        }

        if (raFetchtype === DELETE) {
            return {
                query: gql`mutation remove${resource}($id: ID!) {
                    remove${resource}(id: $id) {
                        id
                    }
                }`,
                variables: { id: params.id },
                parseResponse: ({ data }: ApolloQueryResult<any>) => {
                    if (data[`remove${resource}`]) {
                        return { data: { id: params.id } };
                    }

                    throw new Error(`Could not delete ${resource}`);
                }
            };
        }
    };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (type: string, resource: string, params: any) => {
    const dataProvider = await buildGraphQLProvider({
        client: gclient,
        buildQuery: customBuildQuery as any
    });

    console.log("dataProvider", dataProvider, type, resource, params);

    return new Proxy<DataProvider>(defaultDataProvider, {
        get: (target, name) => {
            if (typeof name === "symbol" || name === "then") {
                return;
            }
            return async () => dataProvider[type](getGqlResource(resource), params);
        }
    });
};
// Only used to initialize proxy
const defaultDataProvider: DataProvider = {
    create: () => Promise.reject({ data: null }), // avoids adding a context in tests
    delete: () => Promise.reject({ data: null }), // avoids adding a context in tests
    deleteMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
    getList: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
    getMany: () => Promise.resolve({ data: [] }), // avoids adding a context in tests
    getManyReference: () => Promise.resolve({ data: [], total: 0 }), // avoids adding a context in tests
    getOne: () => Promise.reject({ data: null }), // avoids adding a context in tests
    update: () => Promise.reject({ data: null }), // avoids adding a context in tests
    updateMany: () => Promise.resolve({ data: [] }) // avoids adding a context in tests
};
