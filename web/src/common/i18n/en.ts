import englishMessages from "ra-language-english";
import { TranslationMessages } from "react-admin";

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    app: {
        name: "D O S S A",
        title: "Dossier Management System"
    },

    auth: {
        title: "Authentication",
        username: "Public Key",
        password: "Key Hash",
        sign_in: "Scan to submit incidents anonymously",
        connect: "Connect",
        or_continue: "... or continue with your public key"
    },

    pos: {
        search: "Search",
        configuration: "Configuration",
        language: "Language",
        theme: {
            name: "Theme",
            light: "Light",
            dark: "Dark"
        },
        dashboard: {
            incidents_history: "Incidents History",
            count_institutions: "# of Institutions",
            count_activists: "# of Activists",
            recent_incidents: "Recent Incidents",
            recent_institutions: "Recent Institutions",
            all_institutions: "See all institutions",
            all_incidents: "See all incidents"
        }
    },
    resources: {
        institutions: {
            title: "Institutions",
            name: "Institution |||| Institutions",
            filters: {
                incidentTypes: "Corruptions",
                zero_10: "Up to 10 cases",
                ten_25: "10 to 25 cases",
                twentyfive_50: "25 to 50 cases",
                fifty_more: "50 & above cases",
                cases_count: "Cases Count",
                has_people: "Has people"
            }
        },
        incidents: {
            name: "Incident |||| Incidents",
            incident_types: "Incident Type |||| Incident Types",
            filters: {
                incident_types: "Incident Type",
                zero_10: "Up to 10 cases",
                ten_25: "10 to 25 cases",
                twentyfive_50: "25 to 50 cases",
                fifty_more: "50 & above cases",
                cases_count: "Cases Count"
            }
        },
        reporting: {
            title: "Reporting",
            incident_types_ratio: "Corruption in Percentage",
            popular_hashtags: "Trending Hashtags",
            popular_hashtags_description: "Popular hashtags in the last months",
            list_incident_types: "List of Corruptions"
        }
    }
};

export default customEnglishMessages;
