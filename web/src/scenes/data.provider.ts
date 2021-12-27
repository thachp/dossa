import { ApolloClient } from "@apollo/client";
import flat from "flat";
import { DocumentNode } from "graphql";
import { isNumber } from "lodash";
import isEmpty from "lodash.isempty";
import pluralize from "pluralize";
import { GetListParams } from "react-admin";

import gclient from "../common/graphql.config";
import IncidentType from "./incidentTypes/incidentTypes.constant";
import Institution from "./institutions/institution.contant";

export interface RaFetchMethodType {
    GET_LIST?: DocumentNode;
    GET_ONE?: DocumentNode;
    GET_MANY?: DocumentNode;
    GET_MANY_REFERENCE?: DocumentNode;
    CREATE?: DocumentNode;
    UPDATE?: DocumentNode;
    UPDATE_MANY?: DocumentNode;
    DELETE?: DocumentNode;
    DELETE_MANY?: DocumentNode;
}

export interface RaFetchResources {
    [key: string]: RaFetchMethodType;
}

export const getGqlResource = (pluralResource: string, resources: RaFetchResources) => {
    const _resource = pluralize.singular(pluralResource);

    if (!_resource) {
        throw new Error(`Unknown resource ${pluralResource}`);
    }
    const _capitalSingular = _resource.charAt(0).toUpperCase() + _resource.slice(1);

    if (!resources || (resources && !resources[_capitalSingular])) {
        throw new Error(`Unknown resource ${_capitalSingular}`);
    }
    return _capitalSingular;
};

export const buildQueryWhere = (filters: any) => {
    // @TODO: add support for assign filter properties using JSON.string & atob() to decode base64 encoded string

    // expect object only
    if (!filters || filters === undefined || isNumber(filters)) {
        throw new Error("Invalid filters");
    }

    if (isEmpty(filters)) {
        return {};
    }

    let where: any = {};

    // loop through filters
    for (const property in filters) {
        let [field, operation] = property.split("_");

        // if operation is not defined, assume equalTo
        if (!operation) {
            operation = "equalTo";
        }

        // assign operation to field
        where[field] = {
            [operation]: filters[property]
        };

        // if operation is matches regex, also assign options
        if (operation === "matchesRegex") {
            where[field] = {
                ...where[field],
                options: "i"
            };
        }
    } // end for

    return where;
};

/**
 * Get a list of resources
 * @param resource
 * @param params
 * @returns
 */

export const buildGetListProvider = async (
    client: ApolloClient<any>,
    resources: RaFetchResources,
    resource: string,
    params: GetListParams
) => {
    const _pluralResource = pluralize(resource);
    const pluralResource = _pluralResource.charAt(0).toLowerCase() + _pluralResource.slice(1);

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const take = perPage;
    const skip = (page - 1) * perPage;

    if (!resources[resource]) {
        throw new Error(`Invalid resource :  ${resource}`);
    }

    const { GET_LIST } = resources[resource];

    if (!GET_LIST) {
        return {
            data: [],
            total: 0
        };
    }

    const where = buildQueryWhere(params.filter);

    const { data: dataResults } = await client.query({
        query: GET_LIST as any,
        fetchPolicy: "network-only",
        variables: {
            where,
            order: `${field}_${order}`,
            take,
            skip
        }
    });

    console.log("test", pluralResource);

    const { count: total, edges } = dataResults[pluralResource];
    return { total, data: edges.map((edge: { node: any }) => flat(edge.node)) };
};

export const buildGraphQLProvider: any = (gclient: ApolloClient<any>, resourcesProvider: RaFetchResources) => {
    const getListProvider = async (resource: string, params: GetListParams) =>
        buildGetListProvider(gclient, resourcesProvider, resource, params);

    return {
        GET_LIST: getListProvider,

        GET_ONE: async (resource: string, params: any) => {
            return Promise.resolve();
        },
        GET_MANY: async (resource: string, params: any) => {
            return Promise.resolve();
        },
        GET_MANY_REFERENCE: async (resource: string, params: any) => {
            return Promise.resolve();
        },
        CREATE: async (resource: string, params: any) => {
            return Promise.resolve();
        },
        UPDATE: async (resource: string, params: any) => {
            return Promise.resolve();
        },
        UPDATE_MANY: async (resource: string, params: any) => {
            return Promise.resolve();
        },
        DELETE: async (resource: string, params: any) => {
            return Promise.resolve();
        },
        DELETE_MANY: async (resource: string, params: any) => {
            return Promise.resolve();
        }
    };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (type: string, resourceName: string, params: any) => {
    const resourcesProvider: RaFetchResources = {
        Institution,
        IncidentType
    };

    const dataProvider = buildGraphQLProvider(gclient, resourcesProvider);
    return dataProvider[type](getGqlResource(resourceName, resourcesProvider), params);
};
