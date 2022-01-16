import { Card, CardContent, CardHeader } from "@material-ui/core";
import { useTranslate } from "react-admin";
import { ResponsiveContainer, Treemap } from "recharts";

/**
 * Mock data for hash tags treemap
 * TODOs: replace with real data
 */
const data = [
    {
        name: "Collusion",
        size: 24593
    },
    {
        name: "Commercial bribery and kickback",
        children: [
            { name: "commercial", size: 19382 },
            { name: "bribery", size: 19382 },
            { name: "kickback", size: 19382 }
        ]
    },
    {
        name: "Embezzlement",
        size: 14593
    },
    {
        name: "Extortion and solicitation",
        children: [
            { name: "extortion", size: 14593 },
            { name: "solicitation", size: 14593 }
        ]
    },
    {
        name: "Fees and commissions",
        children: [
            { name: "fees", size: 19382 },
            { name: "commissions", size: 11275 }
        ]
    },
    {
        name: "Gifts and hospitality",
        children: [
            { name: "gifts", size: 19382 },
            { name: "hospitality", size: 19382 }
        ]
    },
    {
        name: "Trading in influence",
        children: [
            { name: "trading", size: 9930 },
            { name: "influence", size: 9930 }
        ]
    },
    {
        name: "Favouritism, nepotism, cronyism, clientelism",
        children: [
            { name: "favouritism", size: 9930 },
            { name: "nepotism", size: 9930 },
            { name: "cronyism", size: 9930 },
            { name: "clientelism", size: 9930 }
        ]
    }
];

const HashTagTreeMapChart = () => {
    const translate = useTranslate();

    return (
        <Card style={{ marginTop: "1em" }}>
            <CardHeader title={translate("resources.reporting.popular_hashtags")} />
            <CardContent>
                <div style={{ width: "100%", height: 280 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <Treemap
                            width={400}
                            height={200}
                            data={data}
                            aspectRatio={4 / 3}
                            dataKey="size"
                            stroke="#9ca3af"
                            fill="#e5e7eb"
                        />
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default HashTagTreeMapChart;
