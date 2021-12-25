const { INCIDENT_TYPE, USER } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(INCIDENT_TYPE);
    schema
        .setCLP({
            get: { "*": true, requiresAuthentication: true },
            find: { "*": true, requiresAuthentication: true },
            count: { requiresAuthentication: true },
            create: { "role:analyst": true },
            update: { "role:analyst": true },
            delete: { "role:analyst": true },
            addField: {}
        })
        .addString("name", { required: true })
        .addPointer("createdBy", USER)
        .addPointer("updatedBy", USER)
        .addString("description")
        .addIndex("incidentTypeNameIndex", {
            name: 1
        });
    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(INCIDENT_TYPE);
    return schema.purge().then(() => schema.delete());
};
