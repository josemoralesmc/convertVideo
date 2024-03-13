import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Cookies from "js-cookie";
import "./VideoList.css";

interface Video {
  url: string;
  // Agrega más propiedades según sea necesario
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const token = Cookies.get("Token");
  const fetchData = async () => {
    const response = await fetch("https://convertvideo-j12c.onrender.com/video/myvideos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    console.log(res);
    setVideos(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" component="div">
          Your list videos
        </Typography>
        <Demo className="container">
            <List className="item" dense>
              {videos.map((video, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <a
                      href={video.url}
                      target="_self"
                      rel="noopener noreferrer"
                    >
                      <IconButton edge="end" aria-label="download">
                        <FileDownloadIcon />
                      </IconButton>
                    </a>
                  }
                >
                  <audio controls>
                    <source src={video.url} type="audio/mp3" />
                  </audio>
                </ListItem>
              ))}
            </List>
        </Demo>
      </Grid>
    </Box>
  );
}
