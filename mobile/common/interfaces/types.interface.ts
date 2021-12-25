/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type TabsParamList = {
    SearchInstitutions: undefined;
};

export type RootStackParamList = {
    Main: undefined;
    Submit: undefined;
    Tabs: undefined;
    CreateInstitution: undefined;
    SearchIncidents: undefined;
    SearchProviders: undefined;
    ProcessingIncident: undefined;
    Modal: undefined;
    About: undefined;
    Terms: undefined;
    Credits: undefined;
    Privacy: undefined;
    NotFound: undefined;
};
