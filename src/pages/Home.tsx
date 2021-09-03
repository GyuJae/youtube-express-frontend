import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { videoService } from "../api/api";
import { useUser } from "../contexts/user.context";
import { IVideo } from "../types/Video.interface";
const HomeContainer = styled.main``;

const Home = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const user = useUser();
  const getData = async () => {
    const {
      data: { ok, videos },
    } = await videoService.videos();
    if (ok) {
      setVideos(videos);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <HomeContainer>
      <h1>Hello {user && user.email} ㅋㅋ</h1>
      {videos.length !== 0 ? (
        videos.map((video) => (
          <div key={video._id}>
            <h2>{video.title}</h2>
          </div>
        ))
      ) : (
        <h2>No Videos</h2>
      )}
    </HomeContainer>
  );
};

export default Home;
