/**
 *
 * @param {Parse} Parse
 */
exports.run = async Parse => {
    const roleACL = new Parse.ACL();
    roleACL.setPublicReadAccess(true);

    var query = new Parse.Query(Parse.Role);
    var result = await query.first({ useMasterKey: true });

    if (result) {
        return;
    }

    const role = new Parse.Role("admin", roleACL);
    role.save({ useMasterKey: true });

    const analyst = new Parse.Role("analyst", roleACL);
    analyst.save({ useMasterKey: true });

    const activist = new Parse.Role("activist", roleACL);
    activist.save({ useMasterKey: true });
};
