export const en = {
    name: "DOSSA",
    description: "Decentralized. Anonymous. Transparent",
    copyright: "© {{year}} WGU Enterprises. All rights reserved.",
    version: "1.0.0",
    general: {
        search: "Search",
        cancel: "Cancel",
        next: "Next",
        select: "Select",
        submit: "Submit",
        confirm: "Confirm",
        exit: "Exit",
        error: "Error"
    },
    error: {
        title: "Error",
        upload: "There was an error uploading the file."
    },
    main: {
        title: "Report a corruption issue"
    },
    about: {
        title: "About Us",
        terms: "Terms",
        credits: "Credits",
        privacy: "Privacy",
        description:
            "Dossa is a decentralized, anonymous, and transparent online platform for reporting and analyzing corruption issues.  Users of Dossa, also known as dossants, collect and analyze corruption datasets and publish their findings.",
        faq: {
            title: "Frequently Asked Questions",
            faq1: {
                question: "How Dossa secure data exchange?",
                answer: "When a dossant (Dossa user) submits incidents, Dossa opens a connection to our virtual private network, which enhances the user's security on public Wi-Fi, noisy internet service providers, and from man-in-the-middle attacks.  Also, all data sending or receiving through Dossa are through HTTPS, which provides end-to-end encryption between our services and the mobile application."
            },
            faq2: {
                question: "How Dossa maintain users' anonymity?",
                answer: "Dossa does not store private citizens' data points such as names, phone numbers, email addresses, or postal addresses. Dossa does not track or log activities, and users do not engage in direct communication as in no correspondence.  When users turn rogue, their associates' identities remain safe and protected in the worst case."
            },
            faq3: {
                question: "How is Dossa transparent?",
                answer: "Dossa provides a form of computer-mediated transparency in which computerized systems are used to provide objective information to the public.  We hope to stimulate public officials and institutions to perform better or prevent corruption with information.  Therefore, resulting in more democratic and more affluent societies."
            },
            faq4: {
                question: "Do dossants engage in direct anti-corruption activities?",
                answer: "No! Dossa does not endorse users to confront the corrupt directly.  Instead, dossants must focus on promoting data transparency.  Dossants must only collect, analyze, and publish their abstract findings.  It is up to the open societies and more prominent anti-corruption organizations, such as the Transparency International, to further investigate and act."
            },
            faq5: {
                question: "How to submit bug reports and features requests?",
                answer: "Dossa welcomes all suggestions, thoughts, ideas, and even hard criticisms. You may submit your bug reports and features requests at https://github.com/dossa/tickets"
            }
        }
    },
    providers: {
        title: "Providers",
        search: "Search Providers",
        subtitle: "Which providers should receive your report?"
    },
    incident: {
        title: "Type of Corruption",
        subtitle: "What types of corruption that you are reporting?",
        search: "Search corruptions"
    },
    submitting: {
        title: "Submitting Report",
        subtitle: "This should take less than a few minutes.",
        exit: {
            anytime: "You may [exit] anytime.",
            title: "Are you sure?",
            message: "You are about to exit the submission process.  Are you sure you want to exit?"
        },

        states: {
            connecting: "Connecting to a VPN",
            uploading: "Uploading attachments",
            creating: "Creating new assets",
            submitting: "Submitting the new incident",
            done: "Done"
        }
    },

    institution: {
        title: "Institutions",
        select: "Include involving institutions",
        search: "Search institutions",
        subtitle: "What institutions are you reporting on?",
        empty: "No institutions found.",
        error: {
            max: "You may select up to {{max}} institutions."
        }
    },
    attachment: {
        title: "Attachments",
        error: {
            max: "You may include up to {{max}} attachments."
        }
    },
    create: {
        title: "Report Corruption",
        description: "Description",
        institutions: "Involving institutions",
        remaining: "{{count}} characters remaining",
        hashtags: "keywords seperated by commas",
        placeholder:
            "Help us understand your situation. Please provide the details of the incident (Who, What, When, Where, and Why).",
        attachments: "Optional attachments"
    }
};

export default en;
