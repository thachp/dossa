wireguard = require("../wireguard");

/**
 *
 * @param {Parse} Parse
 */
exports.run = async Parse => {
    const addUserToRoleNamed = async (users, roleName) => {
        // Get the role
        const query = new Parse.Query(Parse.Role);
        query.equalTo("name", roleName);

        // get the role
        const role = await query.first();

        // add the users to the role
        for (let user of users) {
            role.getUsers({
                useMasterKey: true
            }).add(user);
        }

        await role.save({}, { useMasterKey: true });
    };

    var query = new Parse.Query(Parse.User);
    var result = await query.first({ useMasterKey: true });

    if (result) {
        return;
    }

    for (let i = 0; i < 50; i++) {
        let user = new Parse.User();
        let keypair = wireguard.generateKeypair();

        if (i === 0) {
            user.set("username", "administrator");
        } else if (i === 1) {
            user.set("username", "analyst");
        } else if (i === 30) {
            user.set("username", "activist");
        } else {
            user.set("username", keypair.publicKey);
        }

        user.set("password", [0, 1, 30].includes(i) ? "1234" : keypair.privateKey);
        await user.signUp();
    }

    const userquery = new Parse.Query(Parse.User);
    const administrator = await userquery
        .skip(0)
        .limit(1)
        .first();

    if (administrator) {
        await addUserToRoleNamed([administrator], "admin");
    }
    const analystsQuery = userquery.skip(1).limit(25);
    const analysts = await analystsQuery.find();

    await addUserToRoleNamed(analysts, "analyst");

    const activistsQuery = userquery.skip(25).limit(25);
    const activists = await activistsQuery.find();

    await addUserToRoleNamed(activists, "activist");
};
