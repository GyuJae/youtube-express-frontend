import axios from "axios";

interface ILogin {
  email: string;
  password: string;
}

const postApi = (data?: ILogin) =>
  axios.create({
    method: "post",
    baseURL: "http://localhost:4000/",
    headers: {
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/xml",
    },
    data: {
      ...data,
    },
  });

const getApi = () =>
  axios.create({
    method: "get",
    baseURL: "http://localhost:4000/",
    headers: {
      Accept: "*/*",
    },
  });

export const userService = {
  search: () => getApi().get("users/search"),
  join: () => postApi().post("users/join"),
  login: (input: ILogin) =>
    postApi(input)
      .post("users/login")
      .then((res) => {
        // const { token } = res.data;
        // axios.defaults.headers["token"] = token;
        // console.log(axios.defaults.headers["token"]);
        console.log(res);
      }),
  remove: (id: string) => postApi().post(`users/remove/${id}`),
  edit: (id: string) => postApi().post(`users/edit/${id}`),
  detail: (id: string) => getApi().get(`users/${id}`),
  kakaoLogin: () => getApi().get(`users/kakao-login`),
};

export const videoService = {
  videos: () => getApi().get("videos"),
  search: () => getApi().get("videos/search"),
  upload: () => postApi().post("videos/upload"),
  detail: (id: string) => getApi().get(`videos/${id}`),
  edit: (id: string) => postApi().post(`videos/${id}/edit`),
  delete: (id: string) => postApi().post(`videos/${id}/delete`),
};
