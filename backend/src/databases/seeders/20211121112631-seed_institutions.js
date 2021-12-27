const faker = require("faker");
const range = require("lodash/range");

/**
 *
 * @param {Parse} Parse
 */
exports.run = async Parse => {
    // Get the Institution class
    const query = new Parse.Query(Parse.Object.extend("Institution"));
    const result = await query.first();

    // don't import if records already exists
    if (result) {
        return;
    }

    var acl = new Parse.ACL();
    acl.setPublicReadAccess(true);

    const companyList = range(250).map(i => {
        return {
            name: faker.company.companyName(),
            telephone: faker.phone.phoneNumber(),
            faxNumber: faker.phone.phoneNumber(),
            vatID: faker.datatype.uuid(),
            taxID: faker.datatype.uuid(),
            email: faker.internet.email(),
            description: faker.lorem.sentences()
        };
    });

    let companies = companyList.map(company => {
        return new Parse.Object("Institution")
            .setACL(acl)
            .set("name", company.name)
            .set("telephone", company.telephone)
            .set("faxNumber", company.faxNumber)
            .set("vatID", company.vatID)
            .set("taxID", company.taxID)
            .set("email", company.email)
            .set("description", company.description);
    });

    return Parse.Object.saveAll(companies, { useMasterKey: true });
};
