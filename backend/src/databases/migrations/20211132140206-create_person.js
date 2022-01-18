const { PERSON, INCIDENT, USER } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(PERSON);
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
        .addString("firstName", { required: true })
        .addString("lastName", { required: true })
        .addString("honorificPrefix")
        .addString("honorificSuffix")
        .addString("description")
        .addRelation("incidents", INCIDENT)
        .addPointer("updatedBy", USER)
        .addPointer("createdBy", USER);

    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(PERSON);

    return schema.purge().then(() => schema.delete());
};
