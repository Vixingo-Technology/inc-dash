import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet } from "react-router";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import type { Navigation } from "@toolpad/core/AppProvider";

const NAVIGATION: Navigation = [
    {
        kind: "header",
        title: "Main Menu",
    },
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
    },
    {
        segment: "claims",
        title: "Claims",
        icon: <ShoppingCartIcon />,
    },
];

const BRANDING = {
    title: "ISSP",
};

export default function App() {
    return (
        <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
            <Outlet />
        </ReactRouterAppProvider>
    );
}
