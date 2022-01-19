import { ApolloClient } from "@apollo/client";
import flat from "flat";
import { DocumentNode } from "graphql";
import { isNumber } from "lodash";
import isEmpty from "lodash.isempty";
import pluralize from "pluralize";
import { DeleteManyParams, GetListParams } from "react-admin";

import gclient from "../common/graphql.config";
import Incident from "./incidents/incident.contant";
import Institution from "./institutions/institution.contant";
import IncidentType from "./reporting/incidentTypes.constant";

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

/**
 * stringify object to string && encode to base64
 * @param obj
 * @returns
 */
export const encodeFieldName = (obj: object): string => {
    let [firstKey] = Object.keys(flat.flatten(obj));
    return firstKey;
};

/***
 * decode from base64 & parse to object
 */
export const decodeFieldName = (flatten: string, value: any) => {
    function strIsEmpty(str: string) {
        return !str || str.length === 0;
    }
    if (strIsEmpty(flatten)) return {};
    const _value = strIsEmpty(value) ? "" : value;
    return flat.unflatten({
        [flatten]: _value
    });
};

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

    for (const property in filters) {
        let filter: any = decodeFieldName(property, filters[property]);
        where[property] = filter[property];
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

    let where = params.filter;

    if (where.q) {
        where = {
            ...where,
            name: {
                matchesRegex: where.q,
                options: "i"
            }
        };

        delete where.q;
    }

    const { data: dataResults } = await client.query({
        query: GET_LIST,
        fetchPolicy: "network-only",
        variables: {
            where,
            order: `${field}_${order}`,
            take,
            skip
        }
    });

    const { count: total, edges } = dataResults[pluralResource];
    return { total, data: edges.map((edge: { node: any }) => flat(edge.node)) };
};

export const buildDeleteManyProvider = async (
    client: ApolloClient<any>,
    resources: RaFetchResources,
    resource: string,
    params: DeleteManyParams
) => {
    const { ids } = params;

    if (!resources[resource]) {
        throw new Error(`Invalid resource :  ${resource}`);
    }

    const { DELETE } = resources[resource];

    if (!DELETE) {
        return;
    }

    for (const id of ids) {
        await client.mutate({
            mutation: DELETE,
            variables: {
                input: {
                    id: id
                }
            }
        });
    }

    return Promise.resolve({
        data: ids
    });
};

export const buildGraphQLProvider: any = (gclient: ApolloClient<any>, resourcesProvider: RaFetchResources) => {
    const getListProvider = async (resource: string, params: GetListParams) =>
        buildGetListProvider(gclient, resourcesProvider, resource, params);

    const deleteManyProvider = async (resource: string, params: DeleteManyParams) =>
        buildDeleteManyProvider(gclient, resourcesProvider, resource, params);

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
        DELETE_MANY: deleteManyProvider
    };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (type: string, resourceName: string, params: any) => {
    const resourcesProvider: RaFetchResources = {
        Institution,
        IncidentType,
        Reporting: IncidentType,
        Incident
    };

    const dataProvider = buildGraphQLProvider(gclient, resourcesProvider);
    return dataProvider[type](getGqlResource(resourceName, resourcesProvider), params);
};
