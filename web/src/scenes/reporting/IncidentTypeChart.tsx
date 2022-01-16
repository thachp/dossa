import { Card, CardContent, CardHeader } from "@material-ui/core";
import { useTranslate } from "react-admin";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

/**
 * Mock data for the number of incidents per day
 * TODOs: Building an endpoint to get the number of incidents per month
 */
const data = [
    { name: "Collusion", value: 400 },
    { name: "Commercial bribery and kickback", value: 300 },
    { name: "Embezzlement", value: 300 },
    { name: "Extortion and solicitation", value: 122 },
    { name: "Favouritism, nepotism, cronyism, clientelism", value: 200 },
    { name: "Fees and commissions", value: 300 },
    { name: "Gifts and hospitality", value: 240 },
    { name: "Trading in influence", value: 210 },
    { name: "Trading of information", value: 495 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#EE7B30", "#D55672", "#00FFC5", "#ADF5FF", "#481620"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const IncidentTypeChart = () => {
    const translate = useTranslate();

    return (
        <Card style={{ marginTop: "1em" }}>
            <CardHeader title={translate("resources.reporting.incident_types_ratio")} />
            <CardContent>
                <div style={{ width: "100%", height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={renderCustomizedLabel}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default IncidentTypeChart;
