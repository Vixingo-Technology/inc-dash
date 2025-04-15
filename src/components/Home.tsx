import React, { useEffect, useState } from "react";
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
import Cvp from "./charts/Cvp";
import claimData from "../data/data.json";
import TypeBar from "./charts/TypeBar";
import PremiumLine from "./charts/PremiumLine";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const StatCard = ({ label, value, change, color }) => {
    const theme = useTheme();
    const colorMap = {
        green: theme.palette.success.main,
        red: theme.palette.error.main,
        gray: theme.palette.text.secondary,
    };

    // useEffect(() => {
    //     console.log(data, "data");
    // });

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
                        ${value}
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

                <Typography variant="body2">Selected Date Range</Typography>
            </CardContent>
        </Card>
    );
};

const Home = () => {
    const currentYear = dayjs();
    const [filterData, setFilterData] = useState(claimData);

    const [startDate, setStartDate] = useState(dayjs("2024-04-01"));
    const [endDate, setEndDate] = useState(dayjs());
    const [totalClaim, setTotalClaim] = useState<number>(0);
    const [totalReq, setTotalReq] = useState<number>(0);
    const [totalClaimed, setTotalClaimed] = useState<number>(0);
    const [cvp, setCvp] = useState<number>(0);

    // Calculate total claim amount whenever dates change
    useEffect(() => {
        if (startDate && endDate) {
            const total = claimData
                .filter((item) => {
                    const claimDate = new Date(item.ClaimDate);
                    return (
                        claimDate >= startDate.toDate() &&
                        claimDate <= endDate.toDate()
                    );
                })
                .reduce((sum, item) => sum + item.TotalApproved, 0);

            setTotalClaim(total);

            const totalReq = claimData
                .filter((item) => {
                    const claimDate = new Date(item.ClaimDate);
                    return (
                        claimDate >= startDate.toDate() &&
                        claimDate <= endDate.toDate()
                    );
                })
                .reduce((sum, item) => sum + item.TotalClaimAmount, 0);

            setTotalReq(totalReq);

            const settled = claimData
                .filter((item) => {
                    const claimDate = new Date(item.ClaimDate);
                    return (
                        claimDate >= startDate.toDate() &&
                        claimDate <= endDate.toDate()
                    );
                })
                .reduce((sum, item) => sum + item.Settle, 0);

            setTotalClaimed(settled);

            setCvp((settled / totalReq) * 100);
        }
    }, [startDate, endDate]);

    console.log(cvp, "cvp");
    return (
        <>
            <Box p={0}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        flexWrap: "wrap",
                        gap: 1,
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="From"
                            maxDate={currentYear}
                            value={startDate}
                            onChange={(value) => value && setStartDate(value)}
                            // defaultValue={dayjs("1990-01-01")}
                            openTo="year"
                            views={["year", "month"]}
                            yearsOrder="desc"
                            sx={{ width: { xs: "100%", md: "49%" } }}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="To"
                            maxDate={currentYear}
                            openTo="year"
                            value={endDate}
                            onChange={(value) => value && setEndDate(value)}
                            // defaultValue={dayjs()}
                            views={["year", "month"]}
                            yearsOrder="desc"
                            sx={{ width: { xs: "100%", md: "49%" } }}
                        />
                    </LocalizationProvider>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label="Premimum"
                            value={totalReq.toFixed(2)}
                            change="+25%"
                            color="green"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label="Total Claim"
                            value={totalClaim.toFixed(2)}
                            change="-25%"
                            color="red"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            label="Claim Settlement"
                            value={totalClaimed.toFixed(2)}
                            change="15%"
                            color="yellow"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            mt={2}
                        >
                            Claims vs Premium{" "}
                        </Typography>
                        <Cvp cvp={cvp} />
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
