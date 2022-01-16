const { INCIDENT, ASSET, INCIDENT_TYPE, HASHTAG, INSTITUTION, USER } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(INCIDENT);
    schema
        .setCLP({
            get: { "role:activist": true, requiresAuthentication: true },
            find: { "role:analyst": true },
            count: { "role:analyst": true },
            create: { "role:activist": true, "role:analyst": true, requiresAuthentication: true },
            update: {},
            delete: { "role:analyst": true },
            addField: {}
        })
        .addPointer("updatedBy", USER)
        .addPointer("createdBy", USER)
        .addPointer("incidentType", INCIDENT_TYPE)
        .addString("description", { required: true })
        .addRelation("assets", ASSET)
        .addRelation("institutions", INSTITUTION)
        .addRelation("tags", HASHTAG, { required: false });

    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(INCIDENT);
    return schema.purge().then(() => schema.delete());
};
