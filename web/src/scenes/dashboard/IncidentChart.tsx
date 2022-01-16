import { Card, CardContent, CardHeader } from "@material-ui/core";
import { useTranslate } from "react-admin";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

/**
 * Mock data for the number of incidents per day
 * TODOs: Building an endpoint to get the number of incidents per month
 */
const data = [
    {
        name: "January",
        institutions: 4000,
        incidents: 2400
    },
    {
        name: "February",
        institutions: 3000,
        incidents: 1398
    },
    {
        name: "March",
        institutions: 2000,
        incidents: 8
    },
    {
        name: "April",
        institutions: 2780,
        incidents: 3908
    },
    {
        name: "May",
        institutions: 18,
        incidents: 4800
    },
    {
        name: "June",
        institutions: 2390,
        incidents: 3800
    },
    {
        name: "July",
        institutions: 3490,
        incidents: 4300
    },
    {
        name: "August",
        institutions: 1490,
        incidents: 1300
    },
    {
        name: "September",
        institutions: 1490,
        incidents: 4300
    },
    {
        name: "October",
        institutions: 3490,
        incidents: 3300
    },
    {
        name: "November",
        institutions: 2490,
        incidents: 1300
    },
    {
        name: "December",
        institutions: 1490,
        incidents: 2300
    }
];

const IncidentChart = () => {
    const translate = useTranslate();

    return (
        <Card>
            <CardHeader title={translate("pos.dashboard.incidents_history")} />
            <CardContent>
                <div style={{ width: "100%", height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="institutions" stackId="a" fill="#8884d8" />
                            <Bar dataKey="incidents" stackId="a" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default IncidentChart;
