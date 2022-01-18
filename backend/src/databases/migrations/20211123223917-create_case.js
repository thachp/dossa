const { CASE, INCIDENT_TYPE, INCIDENT, HASHTAG, USER, REVIEW } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(CASE);
    schema
        .setCLP({
            get: { "role:analyst": true },
            find: { "role:analyst": true },
            count: { "role:analyst": true },
            create: { "role:analyst": true },
            update: { "role:analyst": true },
            delete: { "role:analyst": true },
            addField: {}
        })
        .addPointer("updatedBy", USER)
        .addPointer("createdBy", USER)
        .addRelation("incidentTypes", INCIDENT_TYPE)
        .addRelation("reviews", REVIEW)
        .addRelation("incidents", INCIDENT)
        .addRelation("tags", HASHTAG)
        .addString("summary", { required: true })
        .addString("description");

    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(CASE);

    return schema.purge().then(() => schema.delete());
};
