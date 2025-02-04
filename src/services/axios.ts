import Axios from "axios";
import { baseUrl } from "src/utils/index.js";

const axios = Axios.create({
  baseURL: baseUrl,
  //   withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axios;
