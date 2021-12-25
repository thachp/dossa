import DollarIcon from "@material-ui/icons/AttachMoney";
import { useEffect, useState } from "react";
import { useDataProvider, useTranslate, useVersion } from "react-admin";

import CardWithIcon from "../../components/cards/CardWithIcon";
import RecentIncident from "../incidents/Recent.incident";
import PendingReviews from "./PendingReviews";


interface State {
    activistsCount: number;
    casesCount: number;
    incidentsCount: number;
    reviewsCount: number;
 }
 
const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;

const Dashboard = () => {
    const [state, setState] = useState<State>({
        activistsCount: 10,
        casesCount: 10,
        incidentsCount: 10,
        reviewsCount: 10,
    });
    const version = useVersion();
    const dataProvider = useDataProvider();
    const translate = useTranslate();
    

    useEffect(() => {

    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        activistsCount,
        casesCount,
        incidentsCount,
        reviewsCount,
    } = state;
    return (
        <>
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                    <CardWithIcon
            to="/activists"
            icon={DollarIcon}
            title={translate('pos.dashboard.new_orders')}
            subtitle={activistsCount}
        />
        

                        <Spacer />
                        <CardWithIcon
            to="/cases"
            icon={DollarIcon}
            title={translate('pos.dashboard.new_orders')}
            subtitle={casesCount}
        />
                    </div>
                    <div style={styles.singleCol}>
                        Monthly Incidents
                    </div>
                    <div style={styles.singleCol}>
                        List of Institutions
                    </div>
                </div>
                <div style={styles.rightCol}>
                    <div style={styles.flex}>
                        <PendingReviews
                            nb={incidentsCount}
                            reviews={[]}
                        />
                        <Spacer />
                        <PendingReviews
                            nb={reviewsCount}
                            reviews={[]}
                        />
                        <Spacer />
                        <RecentIncident />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;
