import axios from "axios";
import { baseUrl } from "src/utils";

export default axios.create({
  baseURL: baseUrl,
});

axios.defaults.withCredentials = true;
export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
