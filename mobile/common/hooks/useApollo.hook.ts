import {
    DocumentNode,
    MutationHookOptions,
    QueryHookOptions,
    useLazyQuery as useApolloLazyQuery,
    useMutation as useApolloMutation,
    useQuery as useApolloQuery,
} from "@apollo/client";
import { useState } from "@hookstate/core";

import { globalState } from "../../common/global.state";

export const useLazyQuery = (action: DocumentNode, options: QueryHookOptions) => {
    const global = useState(globalState);
    const { user: _user } = global.get();
    const user = _user && JSON.parse(_user);

    return useApolloLazyQuery(action, {
        ...options,
        context: {
            headers: {
                "Content-Type": "application/json",
                "X-Parse-Session-Token": user?.sessionToken
            }
        }
    });
};

export const useQuery = (action: DocumentNode, options: QueryHookOptions = {}) => {
    const global = useState(globalState);
    const { user: _user } = global.get();
    const user = _user && JSON.parse(_user);

    return useApolloQuery(action, {
        ...options,
        skip: !user,
        context: {
            headers: {
                "Content-Type": "application/json",
                "X-Parse-Session-Token": user?.sessionToken
            }
        }
    });
};

export const useMutation = (action: DocumentNode, options: MutationHookOptions) => {
    const global = useState(globalState);
    const { user: _user } = global.get();
    const user = _user && JSON.parse(_user);

    return useApolloMutation(action, {
        ...options,
        context: {
            headers: {
                "Content-Type": "application/json",
                "X-Parse-Session-Token": user?.sessionToken
            }
        }
    });
};
