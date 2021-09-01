import axios from "axios";
import { TOKEN } from "../contants";

const postApi = () =>
  axios.create({
    method: "post",
    baseURL: "http://localhost:4000/",
    headers: {
      Accept: "*/*",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/xml",
      token: localStorage.getItem(TOKEN),
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
  remove: (id: string) => postApi().post(`users/remove/${id}`),
  edit: (id: string) => postApi().post(`users/edit/${id}`),
  detail: (id: string) => getApi().get(`users/${id}`),
  kakaoLogin: () => getApi().get(`users/kakao-login`),
  findById: (id: string) => getApi().get(`users/${id}`),
};

export const videoService = {
  videos: () => getApi().get("videos"),
  search: () => getApi().get("videos/search"),
  upload: () => postApi().post("videos/upload"),
  detail: (id: string) => getApi().get(`videos/${id}`),
  edit: (id: string) => postApi().post(`videos/${id}/edit`),
  delete: (id: string) => postApi().post(`videos/${id}/delete`),
};
