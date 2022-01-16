import { Identifier, Record, ReduxState } from "react-admin";

export type ThemeName = "light" | "dark";

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface IncidentType extends Record {
    name: string;
}

export interface Incident extends Record {
    incidentType: Identifier;
    description: string;
    createdBy: string;
    tags: string[];
}

export interface Institution extends Record {
    name: string;
    description: string;
    telephone: string;
    email: string;
}

export interface IncidentType extends Record {
    id: string;
    name: string;
    description?: string;
}

declare global {
    interface Window {
        restServer: any;
    }
}
