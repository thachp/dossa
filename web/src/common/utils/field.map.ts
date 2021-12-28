/**
 * Encode object to string
 * @param obj
 * @returns
 */
export const toFieldName = (obj: object): string => {
    // stringify object to string
    // encode to base64
    return atob(JSON.stringify(obj));
};

/***
 * Decode string to object
 */
export const fromFieldName = (objHash: string) => {
    function strIsEmpty(str: string) {
        return !str || str.length === 0;
    }

    if (strIsEmpty(objHash)) return {};

    // decode from base64
    // parse to object
    return JSON.parse(btoa(objHash));
};
