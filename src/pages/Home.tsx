import React, { useEffect } from "react";
import { videoService } from "../api/api";

const Home = () => {
  //const [videos, setVideos] = useState<any>(null);

  const getData = async () => {
    const data = await videoService.videos();
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>Home</div>;
};

export default Home;
