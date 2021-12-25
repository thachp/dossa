import { useState } from "@hookstate/core";

import { APPLICATION_ID, JAVASCRIPT_KEY, PARSE_API } from "../constants/settings.constant";
import { globalState } from "../global.state";
import { Attachment } from "../interfaces/attachment.interface";

export const useUploadFile = async (attachment: Attachment) => {
    const global = useState(globalState);
    const { user: _user } = global.get();
    const user = _user && JSON.parse(_user);

    const formData = new FormData();
    formData.append("uri", attachment.uri);
    formData.append("name", attachment.name);
    formData.append("mimeType", attachment.mimeType || "text/html");

    console.log("abc", formData);

    return await fetch(`${PARSE_API}/files/${attachment.name}`, {
        method: "POST",
        body: formData,
        headers: {
            "content-type": attachment.mimeType || "text/html",
            "X-Parse-Session-Token": user?.sessionToken,
            "X-Parse-Application-Id": APPLICATION_ID,
            "X-Parse-Javascript-Key": JAVASCRIPT_KEY
        }
    });
};
