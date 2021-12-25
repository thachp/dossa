const { HASHTAG } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(HASHTAG);
    schema
        .setCLP({
            get: { requiresAuthentication: true },
            find: { requiresAuthentication: true },
            count: { requiresAuthentication: true },
            create: { requiresAuthentication: true },
            update: { "role:analyst": true },
            delete: { "role:analyst": true },
            addField: {}
        })
        .addString("keyword", { required: true })
        .addString("description")
        .addIndex("tagKeywordIndex", {
            keyword: 1
        });
    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(HASHTAG);
    return schema.purge().then(() => schema.delete());
};
