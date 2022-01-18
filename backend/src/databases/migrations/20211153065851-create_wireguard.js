const { WIREGUARD, USER } = require("../entities");

/**
 * VPN Status = -1: Rejected, 0: Initiated, 1: Processing, 2: Aprroved
 * @param {Parse} Parse
 */
exports.up = async Parse => {
    const schema = new Parse.Schema(WIREGUARD);

    schema
        .setCLP({
            get: { "role:admin": true, "role:analyst": true, "role:activist": true },
            find: { "role:admin": true },
            count: { "role:admin": true },
            create: { "role:admin": true, "role:analyst": true, "role:activist": true },
            update: { "role:admin": true },
            delete: { "role:admin": true },
            addField: {}
        })
        .addPointer("user", USER)
        .addNumber("vpnStatus", {
            required: true,
            default: 0
        })
        .addString("publicKey", {
            required: true
        })
        .addPointer("approvedBy", USER)
        .addDate("approvedAt")
        .addIndex("wireguardPublicKeyIndex", {
            publicKey: 1
        });

    return schema.save();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = async Parse => {
    const schema = new Parse.Schema(WIREGUARD);
    return schema.purge().then(() => schema.delete());
};
