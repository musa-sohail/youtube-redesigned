import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import Typography from "@mui/material/Typography";
const Navbar = () => {
  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        p={2}
        sx={{
          position: "sticky",
          background: "#000",
          top: 0,
          justifyContent: "space-between",
        }}>
       <Link to="/" style={{display:'flex', alignItems:'center'}}>
       <img src={logo} alt="logo" height={45} /> 
       <Typography
          variant="h4"
          fontWeight="bold"
          pl={2}
          sx={{ color: "white" }}
        >
         Youtube <span style={{ color: "#F31503" }}>2.0</span>
        </Typography>
       </Link>
      <SearchBar/>
      </Stack>
    </div>
  );
};

export default Navbar;
