import { useLayoutEffect, useState } from "react";
import { useDataProvider, useGetList, useTranslate, useVersion } from "react-admin";
import { useHistory } from "react-router";

import { Incident, Institution } from "../../types";
import IncidentTypes from "./List.incidenttype";

interface State {
    activistsCount: number;
    institutionsCount: number;
}

const styles = {
    flex: { display: "flex" },
    flexColumn: { display: "flex", flexDirection: "column" },
    leftCol: { flex: 1, marginRight: "0.5em" },
    rightCol: { flex: 1, marginLeft: "0.5em" },
    singleCol: { marginTop: "1em", marginBottom: "1em" }
};

const Spacer = () => <span style={{ width: "1em" }} />;

const Reporting = () => {
    const version = useVersion();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    const {
        location: { pathname }
    } = useHistory();

    const { data: incidents } = useGetList<Incident>(
        "incidentTypes",
        { page: 1, perPage: 8 },
        { field: "createdAt", order: "DESC" },
        {}
    );

    const { data: institutions } = useGetList<Institution>(
        "institutions",
        { page: 1, perPage: 5 },
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
                <h1>Testing</h1>
                <hr />
                <h1>Testing</h1>
            </div>
        </div>
    );
};

export default Reporting;
