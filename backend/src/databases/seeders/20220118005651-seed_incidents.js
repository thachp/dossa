const { INCIDENT, INSTITUTION, USER, HASHTAG, INCIDENT_TYPE } = require("../entities");
const range = require("lodash/range");
const faker = require("faker");
const uniq = require("lodash/uniq");

/**
 *
 * @param {Parse} Parse
 */
exports.run = async Parse => {
    // Get the incident class
    const query = new Parse.Query(Parse.Object.extend(INCIDENT));
    const result = await query.first({ useMasterKey: true });
    if (result) {
        return;
    }

    var acl = new Parse.ACL();
    acl.setRoleReadAccess("analyst", true);
    acl.setRoleWriteAccess("analyst", true);

    // Get the incident types
    const qIncidentTypes = new Parse.Query(Parse.Object.extend(INCIDENT_TYPE));
    const incidentTypes = await qIncidentTypes.find({ useMasterKey: true });

    // Get institutions
    const qInsitutions = new Parse.Query(Parse.Object.extend(INSTITUTION));
    const institutions = await qInsitutions.find({ useMasterKey: true });

    // Get users
    const qUsers = new Parse.Query(Parse.Object.extend(Parse.User));
    const users = await qUsers.find({ useMasterKey: true });

    // Incidents list
    const incidentsList = range(500).map(() => {
        // Get a random incident type
        let incidentType = incidentTypes[faker.datatype.number(incidentTypes.length - 1)];

        // Get a random user
        let user1 = users[faker.datatype.number(users.length - 1)];

        // Create a new incident
        let incident = new Parse.Object(INCIDENT);
        incident.setACL(acl);
        incident.set("incidentType", incidentType);
        incident.set("description", faker.lorem.paragraphs());
        incident.set("createdBy", user1);
        incident.set("createdAt", new Date() - faker.datatype.number(1000 * 60 * 60 * 24 * 365));

        return incident;
    });

    // Get random tags

    const _tags = range(1).map(() => {
        return faker.lorem.word();
    });

    const uniqueTags = uniq(_tags);

    let tags = uniqueTags.map(tag => {
        return new Parse.Object(HASHTAG)
            .setACL(acl)
            .set("keyword", tag)
            .set("description", faker.lorem.sentence());
    });

    // create tags
    Parse.Object.saveAll(tags, { useMasterKey: true });

    // save incidents
    Parse.Object.saveAll(incidentsList, { useMasterKey: true });
};
