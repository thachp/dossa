import englishMessages from "ra-language-english";
import { TranslationMessages } from "react-admin";

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    app: {
        title: "Dossier Management System"
    },

    auth: {
        title: "Authentication",
        username: "Public Key",
        password: "Key Hash",
        sign_in: "Scan to connect to the network",
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
            all_incidents: "See all incidents"
        },
        menu: {
            sales: "Institutions",
            catalog: "Catalog",
            customers: "Customers"
        }
    },
    resources: {
        institutions: {
            title: "Institutions",
            name: "Institution |||| Institutions",
            fields: {
                commands: "Orders",
                first_seen: "First seen",
                groups: "Segments",
                last_seen: "Last seen",
                last_seen_gte: "Visited Since",
                name: "Name",
                total_spent: "Total spent",
                password: "Password",
                confirm_password: "Confirm password",
                stateAbbr: "State"
            },
            filters: {
                incidentTypes: "Corruptions",
                zero_10: "Up to 10 cases",
                ten_25: "10 to 25 cases",
                twentyfive_50: "25 to 50 cases",
                fifty_more: "50 & above cases",
                cases_count: "Cases Count",
                has_people: "Has people"
            },
            page: {
                delete: "Delete Customer"
            },
            errors: {
                password_mismatch: "The password confirmation is not the same as the password."
            }
        },

        incidents: {
            name: "Incident |||| Incidents"
        },

        reporting: {
            title: "Reporting",
            amount: "1 review |||| %{smart_count} reviews",
            relative_to_poster: "Review on poster",
            detail: "Review detail",
            fields: {
                customer_id: "Customer",
                command_id: "Order",
                product_id: "Product",
                date_gte: "Posted since",
                date_lte: "Posted before",
                date: "Date",
                comment: "Comment",
                rating: "Rating"
            },
            action: {
                accept: "Accept",
                reject: "Reject"
            },
            notification: {
                approved_success: "Review approved",
                approved_error: "Error: Review not approved",
                rejected_success: "Review rejected",
                rejected_error: "Error: Review not rejected"
            }
        }
    }
};

export default customEnglishMessages;
