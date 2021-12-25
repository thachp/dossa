const { COUNTRY } = require("../entities");
var countries = require("country-data-list").countries;
const faker = require("faker");
/**
 *
 * @param {Parse} Parse
 */
exports.run = async Parse => {
    // Get the country class
    const query = new Parse.Query(Parse.Object.extend(COUNTRY));
    const result = await query.first();
    if (result) {
        return;
    }

    var acl = new Parse.ACL();
    acl.setPublicReadAccess(true);

    const countryList = countries.all
        .filter(country => country.status !== "deleted")
        .map(country => {
            return new Parse.Object(COUNTRY)
                .setACL(acl)
                .set("code", country.alpha2)
                .set("name", country.name)
                .set("description", faker.lorem.sentence());
        });

    return Parse.Object.saveAll(countryList, { useMasterKey: true });
};
