const { REVIEW, USER, HASHTAG } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    // TODO: set className here
    const schema = new Parse.Schema(REVIEW);
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
        .addString("description", { required: true })
        .addRelation("tags", HASHTAG);
    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(REVIEW);
    return schema.purge().then(() => schema.delete());
};
