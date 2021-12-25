wireguard = require("../wireguard");

/**
 *
 * @param {Parse} Parse
 */
exports.run = async Parse => {
    function addUserToRoleNamed(users, roleName) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", roleName);
        return query.first().then(function(role) {
            role.getUsers().add(users);
            return role.save(null, { useMasterKey: true });
        });
    }

    var query = new Parse.Query(Parse.User);
    var result = await query.first({ useMasterKey: true });

    if (result) {
        return;
    }

    for (let i = 0; i < 50; i++) {
        let user = new Parse.User();
        let keypair = wireguard.generateKeypair();
        user.set("username", i === 0 ? "administrator" : keypair.publicKey);
        user.set("password", i === 0 ? "1234" : keypair.privateKey);
        await user.signUp();
    }

    const userquery = new Parse.Query(Parse.User);
    let results = await userquery
        .skip(0)
        .limit(1)
        .find();

    addUserToRoleNamed(results, "Administrator");

    results = await userquery
        .skip(1)
        .limit(25)
        .find();

    addUserToRoleNamed(results, "Analyst");

    results = await userquery
        .skip(25)
        .limit(25)
        .find();
    addUserToRoleNamed(results, "Activist");
};
