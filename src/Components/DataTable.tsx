import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomHeader from "./CustomHeader";
import { fetchAllData } from "./Api/getMany";
import { fetchDataById } from "./Api/getOne";
import { IconButton, MenuItem, Select } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FlagIcon from "@mui/icons-material/Flag";

function DataTable() {
  const [id, setId] = useState("da398447-5804-4901-957a-08dccff0be01");

  const {
    data: allData,
    error: allError,
    isLoading: allLoading,
  } = useQuery(["viewData"], fetchAllData);

  const {
    data: singleData,
    error: singleError,
    isLoading: singleLoading,
  } = useQuery(["viewDataById", id], () => fetchDataById(id));

  const headers = singleData?.headers || [];

  const additionalColumns: GridColDef[] = [
    {
        field: "area",
        headerName: "Area",
        width: 250,
        renderCell: (params) => 
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  height: "40px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                {params.row.name.substring(0, 15)}
                </span>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </div>
              <div
                style={{
                  height: "40px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {params.row.distributionKey?.name}
                <div>
                  <IconButton onClick={() => console.log("Edit")}>
                    <EditIcon style={{ fontSize: "20px" }} />
                  </IconButton>
                  <IconButton onClick={() => console.log("Delete")}>
                    <DeleteIcon style={{ fontSize: "20px" }} />
                  </IconButton>
                </div>
              </div>
              <div
                style={{
                  height: "40px",
                  width: "75%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <div>
                  <FiberManualRecordIcon
                    style={{ color: "red", fontSize: "10px", marginRight: 2 }}
                  />
                  {params.row.distributionKey?.distributions[0].name}
                </div>
                <div>
                  {params.row.distributionKey?.distributions[0].percentage}%
                </div>
              </div>
              <div
                style={{
                  height: "50px",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <IconButton size="small">
                  <FlagIcon />
                </IconButton>
                <Select
                  defaultValue={params.row.name}
                  variant="outlined"
                  size="small"
                  style={{ width: "80%" }}
                >
                  {singleData?.data?.map((item: any) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          
      }
      ,
    { field: "verdi", headerName: "Verdi", width: 150 },
  ];

  const columns: GridColDef[] = useMemo(() => {
    const headerColumns = headers.map((header: string) => ({
      field: header,
      headerName: header,
      width: 175,
      renderHeader: (params: any) => (
        <CustomHeader
          column={params}
          onSearch={(value: string) =>
            console.log(value)
          }
        />
      ),
    }));

    return [
      ...additionalColumns.slice(0, 1),
      ...headerColumns,
      ...additionalColumns.slice(1),
    ];
  }, [headers]);

  const rowsData = singleData?.data?.filter(
    (item: { distributionKey: { name: string } }) => item.distributionKey?.name
  ) || [];
  const rows = rowsData.map(
    (
      item: { name: string; distributionKey: { name: string } },
      index: number
    ) => ({
      id: index + 1,
      name: item.name,
      distributionKey: item.distributionKey,
      verdi: "-",
    })
  );

  if (allLoading || singleLoading) return <div>Loading...</div>;
  if (allError) return <div>Error fetching all data</div>;
  if (singleError) return <div>Error fetching data by ID</div>;

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={rows}
        hideFooter={true}
        columnHeaderHeight={100}
        getRowHeight={() => 200}
        sx={{
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
        }}
      />
    </div>
  );
}

export default DataTable;
