import { createState } from "@hookstate/core";

export interface User {
    id: string;
    username: string;
    sessionToken: string;
}

export interface WireguardKey {
    publicKey: string;
    privateKey: string;
    privateKeyHash: string;
}

export interface GlobalState {
    user?: string;
    winguardKey?: string;
    provider?: string;
    caseType?: string;
    description?: string;
    hashtags?: string;
    institutions: Array<string>;
    attachments: Array<string>;
}

const state = createState<GlobalState>({
    institutions: [],
    attachments: []
});

export const globalState = state;
