import React, { useEffect } from "react";
import { videoService } from "../api/api";
import { useUser } from "../contexts/user.context";

const Home = () => {
  //const [videos, setVideos] = useState<any>(null);
  const user = useUser();
  const getData = async () => {
    // const data = await videoService.videos();
    // console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>{user && user}</div>;
};

export default Home;
