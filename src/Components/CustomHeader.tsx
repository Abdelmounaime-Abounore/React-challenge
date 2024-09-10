import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


interface CustomHeaderProps {
  column: any;
  onSearch: (value: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ column, onSearch }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{column.colDef.headerName}</div>
      <TextField
        id="outlined-end-adornment"
        placeholder="Skiv for a soke ..."
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="button">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        onChange={(e) => onSearch(e.target.value)}
        size="small"
        variant="filled"
      />
    </div>
  );
};

export default CustomHeader;
