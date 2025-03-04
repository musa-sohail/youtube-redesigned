import { Box, Stack, Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import SideBar from "./SideBar";
import Videos from "./Videos";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New')
  const [videos, setVideos] = useState([])

  useEffect(()=>{
   fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
   .then((data)=>setVideos(data.items))
  },[selectedCategory]);
  return (
    <Stack
      sx={{
        flexDirection: { sm: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          height: {
            sx: "auto",
            md: "94vh",
          },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{
            mt: 1.5,
            color: "#fff",
          }}
        >
          Copyright 2024 Youtube 2.0
        </Typography>
      </Box>
      <Box p={2} sx={{overflowY:'auto', height:'90vh', flex:2}}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  );
};

export default Feed;
