import axios from "axios";
import { baseUrl } from "src/utils";

axios.defaults.withCredentials = true;
export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
