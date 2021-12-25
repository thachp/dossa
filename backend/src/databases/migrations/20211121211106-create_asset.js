const { ASSET, USER } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(ASSET);

    schema
        .setCLP({
            get: { "role:analyst": true, requiresAuthentication: true },
            find: { "role:analyst": true },
            create: {
                "role:analyst": true,
                "role:activist": true,
                requiresAuthentication: true
            },
            update: {
                "role:analyst": true
            },
            delete: {
                "role:analyst": true
            },
            addField: {}
        })
        .addPointer("updatedBy", USER)
        .addPointer("createdBy", USER)
        .addString("caption", { required: true })
        .addString("filename", { required: true });
    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(ASSET);
    return schema.purge().then(() => schema.delete());
};
