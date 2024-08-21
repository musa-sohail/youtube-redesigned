import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Typography,
  Box,
  Stack,
  List,
  ListItem,
  Divider,
  Avatar,
  Button,
  Collapse,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [isCommentsExpanded, setCommentsExpanded] = useState(false);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );

    fetchFromAPI(`videos?part=snippet&id=${id}`).then((data) =>
      setDescription(data.items[0].snippet.description)
    );

    fetchFromAPI(`commentThreads?part=snippet&videoId=${id}&maxResults=20`).then(
      (data) => {
        setComments(data.items);
        setDisplayedComments(data.items.slice(0, 20));
      }
    );
  }, [id]);

  const handleLoadMoreComments = () => {
    setDisplayedComments(comments);
  };

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh" display="flex" flexDirection="column">
      <Box>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          className="react-player"
          controls
        />
        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
          {title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ color: "#fff" }}
          py={1}
          px={2}
        >
          <Link to={`/channel/${channelId}`}>
            <Typography
              variant={{ sm: "subtitle1", md: "h6" }}
              color="#fff"
            >
              {channelTitle}
              <CheckCircleIcon
                sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
              />
            </Typography>
          </Link>
          <Stack direction="row" gap="20px" alignItems="center">
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(viewCount).toLocaleString()} views
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {parseInt(likeCount).toLocaleString()} likes
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          borderBottom: "1px solid #606060",
        }}
      >
        <Typography variant="h6" color="white" mb={2}>
          Description
        </Typography>
        <Typography color="white">
          {isDescriptionExpanded
            ? description
            : `${description.slice(0, 20)}...`}
          <Button
            onClick={() => setDescriptionExpanded(!isDescriptionExpanded)}
            color="primary"
          >
            Read more
          </Button>
        </Typography>
        <Box mt={2}>
          <Button
            onClick={() => setCommentsExpanded(!isCommentsExpanded)}
            endIcon={<ExpandMoreIcon />}
            color="primary"
          >
            {isCommentsExpanded ? "Hide" : "Show"} Comments
          </Button>
        </Box>
        <Collapse in={isCommentsExpanded}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="white" mb={2}>
              Comments
            </Typography>
            <List>
              {displayedComments.length === 0 ? (
                <Typography color="white">No comments available</Typography>
              ) : (
                displayedComments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                      <Avatar
                        alt={comment.snippet.topLevelComment.snippet.authorDisplayName}
                        src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                      />
                      <Box ml={2}>
                        <Typography color="white" fontWeight="bold">
                          {comment.snippet.topLevelComment.snippet.authorDisplayName}
                        </Typography>
                        <Typography color="white">
                          {comment.snippet.topLevelComment.snippet.textDisplay}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))
              )}
              {comments.length > displayedComments.length && (
                <ListItem>
                  <Button onClick={handleLoadMoreComments} color="primary">
                    Read more comments
                  </Button>
                </ListItem>
              )}
            </List>
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          padding: 17,
          borderBottom: "1px solid #606060",
          display: "flex",
          justifyContent: "center",
          alignItems:'center',
        }}
      >
        {/* Related Videos */}
        <Videos videos={videos} direction="row" />
      </Box>
    </Box>
  );
};

export default VideoDetail;
