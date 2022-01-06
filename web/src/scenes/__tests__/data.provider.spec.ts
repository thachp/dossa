import { gql } from "graphql-tag";
import capitalize from "lodash.capitalize";
import pluralize, { singular } from "pluralize";

import gclient from "../../common/graphql.config";
import {
    buildGetListProvider,
    buildQueryWhere,
    decodeFieldName,
    encodeFieldName,
    getGqlResource,
    RaFetchResources,
} from "../data.provider";

jest.mock("pluralize");
jest.mock("lodash.capitalize");
jest.mock("../../common/graphql.config");

describe("dataProvider", () => {
    const resources: RaFetchResources = {
        Institution: {
            GET_LIST: gql`
                query {
                    items {
                        id
                    }
                }
            `
        }
    };

    beforeEach(() => {
        (pluralize as any).mockClear();
        (capitalize as any).mockClear();
    });

    describe("Test failed: empty, undefined, bad resource key, and bad resources", () => {
        // setup
        const samples = [
            ["", 1, "Unknown resource"],
            [1, "", "Unknown resource"],
            [undefined, 1, "Unknown resource"],
            [1, undefined, "Unknown resource"]
        ];

        // act && assert
        test.each(samples)(
            "given %p and %p as arguments, expect to throw unknown resource error",
            (resource: any, dataProvider: any) => {
                expect(() => getGqlResource(resource, dataProvider)).toThrow(/Unknown resource/);
            }
        );

        test("given invalid bad resource and resources, expect to throw unkown resource error", () => {
            // setup
            (pluralize as any).singular.mockImplementation((str: string) => "invalid");
            (capitalize as any).mockImplementation((str: string) => "Invalid");

            // act && assert
            expect(() => getGqlResource("invalids", resources)).toThrow(/Unknown resource/);
        });
    });

    describe("Test succesful: valid key and valid resources", () => {
        beforeEach(() => {
            // setup
            (pluralize as any).singular.mockImplementation((str: string) => "institution");
        });

        test("given valid key and valid resources, expect resource string to match", () => {
            // act
            const results = getGqlResource("institutions", resources);

            // assert
            expect(results).toEqual("Institution");
        });

        test("given valid key and valid resources, expect singular and capitalize to be called once", () => {
            // act
            getGqlResource("institutions", resources);

            // assert
            expect(singular).toHaveBeenCalledTimes(1);
        });
    });
});

describe("encodeFieldName", () => {
    test("given object, expect to return base64 encoded string", () => {
        // setup
        const obj = {
            incidentTypes: {
                have: {
                    id: {
                        equalTo: "Hello world"
                    }
                }
            }
        };

        // act
        const results = encodeFieldName(obj);

        // assert
        expect(results).toEqual("incidentTypes.have.id.equalTo");
    });
});

describe("decodeFieldName", () => {
    test("given object, expect to return base64 encoded string", () => {
        // setup
        const obj = {
            incidentTypes: {
                have: {
                    id: {
                        equalTo: "Hello World"
                    }
                }
            }
        };

        // act
        const results = decodeFieldName("incidentTypes.have.id.equalTo", "Hello World");

        // assert
        expect(results).toEqual(obj);
    });
});

describe("buildQueryWhere", () => {
    describe("Test succesful: valid filter", () => {
        test("give valid but empty filter, expect to return empty object", () => {
            // setup && act
            const results = buildQueryWhere({});

            // assert
            expect(results).toEqual({});
        });

        test("given valid and none empty filter, expect to return a valid query object", () => {
            // setup
            const filters = {
                name: "bob",
                email: "Pru",
                "incidentTypes.have.id.equalTo": "Hello World",
                createdAt: new Date("2020-01-01")
            };

            // act
            const results = buildQueryWhere(filters);

            // assert
            expect(results).toEqual({
                name: "bob",
                email: "Pru",
                createdAt: new Date("2020-01-01")
            });
        });
    });

    describe("Test failed: invalid filter", () => {
        // setup && act && assert
        test.each([
            ["", "Invalid filter"],
            [1, "Invalid filter"],
            [null, "Invalid filter"],
            [undefined, "Invalid filter"]
        ])("given %p arguments, expect to throw invalid filter error", (filter, expected) => {
            // act && assert
            expect(() => buildQueryWhere(filter)).toThrow(/Invalid filter/);
        });
    });
});

describe("buildGetListProvider", () => {
    beforeEach(() => {
        (gclient as any).query.mockClear();
        (pluralize as any).mockClear();
    });

    describe("Test succesfull: valid resources", () => {
        test("given valid resources, resource key, params, and client", async () => {
            // setup
            const resources = {
                Institution: {
                    GET_LIST: gql`
                        query {
                            items {
                                id
                            }
                        }
                    `
                }
            };

            const params = {
                filter: {
                    name: {
                        regexMatches: "bob",
                        options: "i"
                    }
                },
                sort: {
                    field: "name",
                    order: "ASC"
                },
                pagination: {
                    page: 1,
                    perPage: 10
                }
            };

            (pluralize as any).mockImplementation(() => "Institutions");

            (gclient as any).query.mockImplementation(() => {
                return {
                    data: {
                        institutions: {
                            count: 1,
                            edges: [
                                {
                                    node: {
                                        id: "1",
                                        name: "bob",
                                        description: "bob"
                                    }
                                }
                            ]
                        }
                    }
                };
            });

            // act
            const results = await buildGetListProvider(gclient, resources, "Institution", params);

            // assert
            expect(gclient.query).toHaveBeenCalledTimes(1);
            expect(gclient.query).toHaveBeenCalledWith({
                query: resources.Institution.GET_LIST,
                fetchPolicy: "network-only",
                variables: {
                    where: {
                        name: {
                            regexMatches: "bob",
                            options: "i"
                        }
                    },
                    order: `name_ASC`,
                    take: 10,
                    skip: 0
                }
            });

            expect(results).toEqual({
                total: 1,
                data: [
                    {
                        id: "1",
                        name: "bob",
                        description: "bob"
                    }
                ]
            });
        });
    });
});
