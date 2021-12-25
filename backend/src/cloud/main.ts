import * as Parse from "parse/node";

const { VPN_IPS = "::ffff:127.0.0.1", ENVIRONMENT } = process.env;

const schemas = ["Incident", "Asset", "Case", "IncidentType", "Institution", "Review", "Person"];

/**
 * Assign created by and updated by fields to the given object.
 */
for (const className of schemas) {
    // Skip if className is already defined
    Parse.Cloud.beforeSave(className, (req: Parse.Cloud.TriggerRequest) => {
        const { object, user } = req;
        const createdBy = object.get("createdBy");

        if (!user || !object) return;

        if (createdBy) {
            object.set("updatedBy", user);
        } else if (!createdBy) {
            object.set("createdBy", user);
        }
    });
}

/**
 * Check if the user is allowed to access the object based on VPN IP.
 */
Parse.Cloud.define(
    "hasVPN",
    async (request: any) => {
        const hasVPNConnection = VPN_IPS.split(",").includes(request.ip);

        if (ENVIRONMENT === "development" || hasVPNConnection) {
            return "ok";
        }
        throw new Error(`VPN connection required`);
    },
    {
        requireUser: true
    }
);
