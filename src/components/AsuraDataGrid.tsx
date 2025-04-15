import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import data from "../data/data.json";

interface AsuraRow {
    [key: string]: string | number | boolean | null;
}

const AsuraDataGrid: React.FC = () => {
    const [rows, setRows] = useState<AsuraRow[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);

    useEffect(() => {
        if (data.length > 0) {
            const generatedColumns: GridColDef[] = Object.keys(data[0]).map(
                (key) => ({
                    field: key,
                    headerName: key,
                    flex: 1,
                    minWidth: 150,
                })
            );

            const updatedRows = data.map((row, index) => ({
                id: index + 1,
                ...row,
            }));

            setColumns(generatedColumns);
            setRows(updatedRows);
        }
    }, []);

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
        </Box>
    );
};

export default AsuraDataGrid;
