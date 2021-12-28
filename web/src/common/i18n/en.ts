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
            monthly_revenue: "Monthly Revenue",
            month_history: "30 Day Revenue History",
            new_orders: "New Orders",
            pending_reviews: "Pending Reviews",
            all_reviews: "See all reviews",
            new_customers: "New Customers",
            all_customers: "See all customers",
            pending_orders: "Top Institutions",
            order: {
                items: "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items"
            },
            welcome: {
                title: "Welcome to the react-admin e-commerce demo",
                subtitle:
                    "This is the admin of an imaginary poster shop. Feel free to explore and modify the data - it's local to your computer, and will reset each time you reload.",
                ra_button: "react-admin site",
                demo_button: "Source for this demo"
            }
        },
        menu: {
            sales: "Institutions",
            catalog: "Catalog",
            customers: "Customers"
        }
    },
    resources: {
        institutions: {
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
            fieldGroups: {
                identity: "Identity",
                address: "Address",
                stats: "Stats",
                history: "History",
                password: "Password",
                change_password: "Change Password"
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

        cases: {
            name: "Case |||| Cases",
            amount: "1 order |||| %{smart_count} orders",
            title: "Order %{reference}",
            fields: {
                basket: {
                    delivery: "Delivery",
                    reference: "Reference",
                    quantity: "Quantity",
                    sum: "Sum",
                    tax_rate: "Tax Rate",
                    taxes: "Tax",
                    total: "Total",
                    unit_price: "Unit Price"
                },
                address: "Address",
                customer_id: "Customer",
                date_gte: "Passed Since",
                date_lte: "Passed Before",
                nb_items: "Nb Items",
                total_gte: "Min amount",
                status: "Status",
                returned: "Returned"
            },
            section: {
                order: "Order",
                customer: "Customer",
                shipping_address: "Shipping Address",
                items: "Items",
                total: "Totals"
            }
        },
        invoices: {
            name: "Case Management",
            fields: {
                date: "Invoice date",
                customer_id: "Customer",
                command_id: "Order",
                date_gte: "Passed Since",
                date_lte: "Passed Before",
                total_gte: "Min amount",
                address: "Address"
            }
        },
        products: {
            name: "Poster |||| Posters",
            fields: {
                category_id: "Category",
                height_gte: "Min height",
                height_lte: "Max height",
                height: "Height",
                image: "Image",
                price: "Price",
                reference: "Reference",
                sales: "Sales",
                stock_lte: "Low Stock",
                stock: "Stock",
                thumbnail: "Thumbnail",
                width_gte: "Min width",
                width_lte: "Max width",
                width: "Width"
            },
            tabs: {
                image: "Image",
                details: "Details",
                description: "Description",
                reviews: "Reviews"
            },
            filters: {
                categories: "Categories",
                stock: "Stock",
                no_stock: "Out of stock",
                low_stock: "1 - 9 items",
                average_stock: "10 - 49 items",
                enough_stock: "50 items & more",
                sales: "Sales",
                best_sellers: "Best sellers",
                average_sellers: "Average",
                low_sellers: "Low",
                never_sold: "Never sold"
            }
        },
        categories: {
            name: "Category |||| Categories",
            fields: {
                products: "Products"
            }
        },
        reviews: {
            name: "Reporting",
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
        },
        segments: {
            name: "Segment |||| Segments",
            fields: {
                customers: "Customers",
                name: "Name"
            },
            data: {
                compulsive: "Compulsive",
                collector: "Collector",
                ordered_once: "Ordered once",
                regular: "Regular",
                returns: "Returns",
                reviewer: "Reviewer"
            }
        }
    }
};

export default customEnglishMessages;
