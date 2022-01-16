import Business from "@material-ui/icons/Business";
import PeopleIcon from "@material-ui/icons/People";
import { useEffect, useState } from "react";
import { useDataProvider, useGetList, useTranslate, useVersion } from "react-admin";

import CardWithIcon from "../../components/cards/CardWithIcon";
import { Incident } from "../../types";
import IncidentChart from "./IncidentChart";
import RecentIncidents from "./RecentIncidents";

interface State {
    activistsCount: number;
    casesCount: number;
    incidentsCount: number;
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
        activistsCount: 10,
        casesCount: 10,
        incidentsCount: 10
    });
    const version = useVersion();
    const dataProvider = useDataProvider();
    const translate = useTranslate();

    const { data: incidents, ids } = useGetList<Incident>(
        "incidents",
        { page: 1, perPage: 8 },
        { field: "createdAt", order: "DESC" },
        {}
    );

    useEffect(() => {}, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const { activistsCount, casesCount } = state;
    return (
        <div style={styles.flex}>
            <div style={styles.leftCol}>
                <div style={styles.flex}>
                    <CardWithIcon
                        to="/institutions"
                        icon={Business}
                        title={translate("pos.dashboard.count_institutions")}
                        subtitle={activistsCount}
                    />
                    <Spacer />
                    <CardWithIcon
                        to="/cases"
                        icon={PeopleIcon}
                        title={translate("pos.dashboard.count_activists")}
                        subtitle={casesCount}
                    />
                </div>
                <div style={styles.singleCol}>
                    <IncidentChart />
                </div>
            </div>
            <div style={styles.rightCol}>
                <RecentIncidents incidents={incidents} />
            </div>
        </div>
    );
};

export default Dashboard;
