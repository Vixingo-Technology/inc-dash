import React from "react";
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    useTheme,
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
                <Typography variant="h5" sx={{ mt: 1 }}>
                    {value}
                </Typography>
                <Typography variant="body2" sx={{ color: colorMap[color] }}>
                    {change}
                </Typography>
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
                            label="Users"
                            value="14k"
                            change="+25%"
                            color="green"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label="Conversions"
                            value="325"
                            change="-25%"
                            color="red"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TypeBar />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography fontWeight={600}>
                                    Explore your data
                                </Typography>
                                <Cvp />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card variant="outlined" sx={{ height: 320 }}>
                            <CardContent>
                                <Typography variant="subtitle2">
                                    Sessions
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    13,277{" "}
                                    <Typography component="span" color="green">
                                        +35%
                                    </Typography>
                                </Typography>
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart data={sessionsData}>
                                        <defs>
                                            <linearGradient
                                                id="colorValue"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#3f51b5"
                                                    stopOpacity={0.5}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#3f51b5"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="date" hide />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="value1"
                                            stroke="#3f51b5"
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value2"
                                            stroke="#3f5125"
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card variant="outlined" sx={{ height: 320 }}>
                            <CardContent>
                                <Typography variant="subtitle2">
                                    Page views and downloads
                                </Typography>
                                <Typography variant="h6" mb={1}>
                                    1.3M{" "}
                                    <Typography component="span" color="error">
                                        -8%
                                    </Typography>
                                </Typography>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={pageViewData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar
                                            dataKey="view"
                                            stackId="a"
                                            fill="#2196f3"
                                        />
                                        <Bar
                                            dataKey="download"
                                            stackId="a"
                                            fill="#90caf9"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;
