/**
 *
 * @param {Parse} Parse
 */
exports.run = async Parse => {
    /**
     * Example:
     * https://www.unodc.org/e4j/en/anti-corruption/module-5/key-issues/forms-and-manifestations-of-private-sector-corruption.html
     * Seed pets
     */

    const incidentTypesList = [
        {
            name: "Commercial bribery and kickback",
            description:
                "These involve employees of one company giving payments, undue advantage or expensive gifts to employees of another company to secure an advantage. Examples include paying procurement staff to sway their decision in favour of the paying company, giving an expensive gift to a bank manager to secure a loan, and various forms of kickbacks."
        },
        {
            name: "Extortion and solicitation",
            description:
                "This occurs when an employee of a company requests a payment, undue advantage, expensive gifts, or sexual favours in return for conducting specific business-related tasks or making particular decisions."
        },
        {
            name: "Gifts and hospitality",
            description:
                "Excessive gifts and hospitality are given to employees to influence business decisions or tasks. This kind of gift might be travel, luxury items or tickets to sporting events."
        },

        {
            name: "Fees and commissions",
            description:
                "Agents and intermediaries are paid fees and commissions beyond what is considered the industry standard, for the purpose of altering business decisions or tasks. Characterizing a payment as a fee or commission might be a way of disguising the payment of a bribe."
        },

        {
            name: "Collusion",
            description:
                "This occurs when, for instance, a labour union employee and a member of the company's management team exchange favours that result in employees' interests not being accurately represented."
        },

        {
            name: "Trading of information",
            description:
                'This happens when a business employee offers or receives a bribe in exchange for confidential information, where the bribe could take a number of different forms. When confidential information is the basis for trading in a company\'s stock, bonds or other securities, this constitutes an offence called "insider trading".'
        },
        {
            name: "Trading in influence",
            description:
                "Sometimes referred to as influence peddling, this activity occurs when a business employee gives payments, undue advantage or expensive gifts to a public official, expecting to receive an undue advantage from the public authority in return. An example is when business people make political donations with the intent of influencing political decisions, policies or laws."
        },
        {
            name: "Embezzlement",
            description:
                "This happens when employees misappropriate anything of value that was entrusted to them because of their position."
        },
        {
            name: "Favouritism, nepotism, cronyism, clientelism",
            description:
                "These forms of corruption occur when a person or group of persons are given unfair preferential treatment at the expense of others."
        }
    ];

    const query = new Parse.Query(Parse.Object.extend("IncidentType"));
    const result = await query.first();

    // don't import if it already exists
    if (result) {
        return;
    }

    var acl = new Parse.ACL();
    acl.setPublicReadAccess(true);

    let incidentTypes = incidentTypesList.map(incidentType => {
        return new Parse.Object("IncidentType")
            .setACL(acl)
            .set("name", incidentType.name)
            .set("description", incidentType.description);
    });

    return Parse.Object.saveAll(incidentTypes, { useMasterKey: true });
};
