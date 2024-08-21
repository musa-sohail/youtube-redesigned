import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const channelData = await fetchFromAPI(`channels?part=snippet,brandingSettings&id=${id}`);
        setChannelDetail(channelData?.items[0]);

        const videosData = await fetchFromAPI(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );
        setVideos(videosData?.items);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            <img
              src={channelDetail?.brandingSettings?.image?.bannerExternalUrl}
              alt="Channel Banner"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                zIndex: 10,
              }}
            />
            <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
          </Box>
          <Box p={2} display="flex">
            <Box sx={{ mr: { sm: "100px" } }} />
            <Videos videos={videos} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChannelDetail;
