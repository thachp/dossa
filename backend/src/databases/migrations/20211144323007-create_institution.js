const { INSTITUTION, COUNTRY, HASHTAG, PERSON, CASE, USER } = require("../entities");

/**
 *
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(INSTITUTION);
    schema
        .setCLP({
            get: { "*": true, requiresAuthentication: true },
            find: { "*": true, requiresAuthentication: true },
            count: { requiresAuthentication: true },
            create: { "role:analyst": true, "role:activist": true },
            update: { "role:analyst": true },
            delete: { "role:analyst": true },
            addField: {}
        })
        .addPointer("updatedBy", USER)
        .addPointer("createdBy", USER)
        .addString("name", { required: true })
        .addString("description")
        .addString("taxID")
        .addString("vatID")
        .addString("telephone")
        .addString("faxNumber")
        .addString("email")
        .addObject("location")
        .addRelation("people", PERSON)
        .addRelation("hashtags", HASHTAG)
        .addRelation("countries", COUNTRY)
        .addRelation("cases", CASE)
        .addIndex("institutionNameIndex", {
            name: 1
        });
    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(INSTITUTION);
    return schema.purge().then(() => schema.delete());
};
