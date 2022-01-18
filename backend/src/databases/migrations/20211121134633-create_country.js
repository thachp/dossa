const { COUNTRY } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(COUNTRY);
    schema
        .setCLP({
            get: { "*": true },
            find: { "*": true },
            count: { "*": true },
            create: {},
            update: {},
            delete: {},
            addField: {}
        })
        .addString("code", { required: true })
        .addString("name", { required: true })
        .addString("description")
        .addIndex("countryIndex", {
            code: 1,
            name: 1
        });

    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(COUNTRY);
    return schema.purge().then(() => schema.delete());
};
