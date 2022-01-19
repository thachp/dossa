import Business from "@material-ui/icons/Business";
import PeopleIcon from "@material-ui/icons/People";
import { useEffect, useState } from "react";
import { useGetList, useTranslate } from "react-admin";
import { useHistory } from "react-router";

import CardWithIcon from "../../components/cards/CardWithIcon";
import { Incident, Institution } from "../../types";
import IncidentChart from "./IncidentChart";
import RecentIncidents from "./RecentIncidents";
import RecentInstitutions from "./RecentInstitutions";

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

const Dashboard = () => {
    const [state, setState] = useState<State>({
        activistsCount: 1125,
        institutionsCount: 326
    });
    const translate = useTranslate();
    const {
        location: { pathname }
    } = useHistory();

    const { data: incidents } = useGetList<Incident>(
        "incidents",
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

    useEffect(() => {
        // check for localstorage.. if doesn't exist, try refreshing the page
        const user = localStorage.getItem("auth-token");
        if (!user && pathname.includes("/dashboard")) {
            window.location.reload();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { activistsCount, institutionsCount } = state;
    return (
        <div style={styles.flex}>
            <div style={styles.leftCol}>
                <div style={styles.flex}>
                    <CardWithIcon
                        to="/institutions"
                        icon={Business}
                        title={translate("pos.dashboard.count_institutions")}
                        subtitle={institutionsCount}
                    />
                    <Spacer />
                    <CardWithIcon
                        to="/"
                        icon={PeopleIcon}
                        title={translate("pos.dashboard.count_activists")}
                        subtitle={activistsCount}
                    />
                </div>
                <div style={styles.singleCol}>
                    <IncidentChart />
                    <br />
                    <RecentInstitutions institutions={institutions} />
                </div>
            </div>
            <div style={styles.rightCol}>
                <RecentIncidents incidents={incidents} />
            </div>
        </div>
    );
};

export default Dashboard;
