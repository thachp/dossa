const { ACTIVITY, USER } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(ACTIVITY);
    schema
        .setCLP({
            get: { "role:analyst": true },
            find: { "role:analyst": true },
            create: {
                "role:activist": true,
                "role:analyst": true
            },
            count: { "role:analyst": true },
            update: {},
            delete: { "role:analyst": true },
            addField: {}
        })
        .addString("type", { required: true })
        .addPointer("actor", USER)
        .addObject("object")
        .addObject("location")
        .addArray("oneOf")
        .addObject("origin")
        .addObject("target");
    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(ACTIVITY);

    return schema.purge().then(() => schema.delete());
};
