import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    useTheme,
    Chip,
} from "@mui/material";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";
import Cvp from "./charts/Cvp";
import data from "../data/data.json";
import TypeBar from "./charts/TypeBar";
import PremiumLine from "./charts/PremiumLine";

const sessionsData = Array.from({ length: 30 }, (_, i) => ({
    date: `Apr ${i + 1}`,
    value1: Math.floor(Math.random() * 5000 + 1000),
    value2: Math.floor(Math.random() * 3000 + 1000),
}));

const pageViewData = [
    { month: "Jan", view: 5000, download: 4000, total: 9000 },
    { month: "Feb", view: 6000, download: 4500, total: 10500 },
    { month: "Mar", view: 4000, download: 4300, total: 8300 },
    { month: "Apr", view: 7000, download: 4200, total: 11200 },
    { month: "May", view: 8000, download: 4600, total: 12600 },
    { month: "Jun", view: 5000, download: 3700, total: 8700 },
    { month: "Jul", view: 4700, download: 3600, total: 8300 },
];

const StatCard = ({ label, value, change, color }) => {
    const theme = useTheme();
    const colorMap = {
        green: theme.palette.success.main,
        red: theme.palette.error.main,
        gray: theme.palette.text.secondary,
    };

    return (
        <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                    {label}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h5" sx={{ mt: 1 }}>
                        {value}
                    </Typography>
                    <Chip
                        variant="outlined"
                        sx={{
                            color: colorMap[color],
                            borderColor: colorMap[color],
                        }}
                        label={change}
                    />
                </Box>

                <Typography variant="body2">Last 30 days</Typography>
            </CardContent>
        </Card>
    );
};

const Home = () => {
    return (
        <>
            <Box p={0}>
                <Typography variant="h6" mb={2}>
                    Overview
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label="Premimum"
                            value="14k"
                            change="+25%"
                            color="green"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label="Total Claim"
                            value="325"
                            change="-25%"
                            color="red"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label="Claim Settlement"
                            value="35"
                            change="15%"
                            color="yellow"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body1">
                            Claims vs Premium{" "}
                        </Typography>
                        <Cvp />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TypeBar />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <PremiumLine />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;
