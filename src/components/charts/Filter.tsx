import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
} from "@mui/material";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    Legend,
} from "recharts";
import data from "../../data/data.json";

interface ClaimData {
    PartnerId: number;
    ClaimNumber: string;
    RefClaimNumber: null | string;
    PolicyNumber: string;
    MemberName: string;
    PartnerName: string | null;
    AccountName: string;
    Producer: string;
    ClaimDate: number;
    DateOfFirstReceiptDoc: string | number;
    claim_type?: string | undefined; // Ensure claim_type is explicitly optional
    coverage?: string; // Ensure coverage is also defined
    [key: string]: any; // Allow additional properties
}
const [filteredData, setFilteredData] = useState<ClaimData[]>(data);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
    const [filteredData, setFilteredData] = useState<ClaimData[]>(data);
    const [filters, setFilters] = useState({
        year: [],
        month: [],
        client: [],
        policy: [],
        coverage: [],
    });

    const extractUniqueValues = (key) => [
        ...new Set(data.map((row) => row[key])),
    ];

    const handleFilterChange = (key) => (event) => {
        setFilters({
            ...filters,
            [key]: event.target.value,
        });
    };

    useEffect(() => {
        let filtered = data;
        Object.keys(filters).forEach((key) => {
            if (filters[key].length > 0) {
                filtered = filtered.filter((item) =>
                    filters[key].includes(item[key])
                );
            }
        });
        setFilteredData(filtered);
    }, [filters]);

    const areaChartData = filteredData.map((item) => ({
        date: item.ClaimDate,
        settlement: Number((item as any).claim_settlement || 0),
    }));

    const pieChartData = [
        {
            value: filteredData.filter(
                (d: ClaimData) => d.claim_type === "In-Patient"
            ),
        },
        {
            name: "Out-Patient",
            value: filteredData.filter((d) => d.claim_type === "Out-Patient")
                .length,
        },
    ];

    const barChartData = extractUniqueValues("coverage").map((coverage) => ({
        coverage,
        claims: filteredData.filter((item) => item.CoverName === coverage)
            .length,
    }));

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Insurance Claims Dashboard
            </Typography>

            <Grid container spacing={2} mb={4}>
                {["year", "month", "client", "policy", "coverage"].map(
                    (key) => (
                        <Grid item xs={12} sm={6} md={2.4} key={key}>
                            <FormControl fullWidth>
                                <InputLabel>{key.toUpperCase()}</InputLabel>
                                <Select
                                    multiple
                                    value={filters[key]}
                                    onChange={handleFilterChange(key)}
                                    input={
                                        <OutlinedInput
                                            label={key.toUpperCase()}
                                        />
                                    }
                                    renderValue={(selected) =>
                                        selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                >
                                    {extractUniqueValues(key).map((value) => (
                                        <MenuItem key={value} value={value}>
                                            <Checkbox
                                                checked={
                                                    filters[key].indexOf(
                                                        value
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText primary={value} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )
                )}
            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                        Claim Settlement Over Time
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={areaChartData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="settlement"
                                stroke="#8884d8"
                                fill="#8884d8"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                        Claim Type Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {pieChartData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">Claims by Coverage</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barChartData}>
                            <XAxis dataKey="coverage" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="claims" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
