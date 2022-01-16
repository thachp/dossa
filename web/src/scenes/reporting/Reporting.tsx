import { useLayoutEffect } from "react";
import { useGetList, useTranslate, useVersion } from "react-admin";

import { Incident } from "../../types";
import HashTagTreeMapChart from "./HashTagsTreeMapChart";
import IncidentTypeChart from "./IncidentTypeChart";
import IncidentTypes from "./List.incidenttype";

const styles = {
    flex: { display: "flex" },
    flexColumn: { display: "flex", flexDirection: "column" },
    leftCol: { flex: 1, marginRight: "0.5em" },
    rightCol: { flex: 1, marginLeft: "0.5em" },
    singleCol: { marginTop: "1em", marginBottom: "1em" }
};

const Reporting = () => {
    const version = useVersion();
    const translate = useTranslate();

    const { data: incidents } = useGetList<Incident>(
        "incidentTypes",
        { page: 1, perPage: 8 },
        { field: "createdAt", order: "DESC" },
        {}
    );

    useLayoutEffect(() => {
        let titleRef = document.querySelector("#react-admin-title");
        if (titleRef) {
            titleRef.innerHTML = translate("resources.reporting.title");
        }
        return () => {
            if (titleRef) {
                titleRef.innerHTML = "";
                titleRef = null;
            }
        };
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={styles.flex}>
            <div style={styles.leftCol}>
                <div style={styles.singleCol}>
                    <IncidentTypes incidents={incidents} />
                </div>
            </div>
            <div style={styles.rightCol}>
                <IncidentTypeChart />
                <hr />
                <HashTagTreeMapChart />
            </div>
        </div>
    );
};

export default Reporting;
