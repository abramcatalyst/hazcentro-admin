import axios from "src/api/axios";
import { useState, useEffect } from "react";

// setAxiosDefaultHeaders();
const useFetchRefreshToken = () => {
  const [token, setToken] = useState("");
  const fetchToken = async () => {
    try {
      const response = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });
      setToken(response?.data?.accessToken);
    } catch (err) {
      console.log("Refresh token hook error", err);
    }
  };
  useEffect(() => {
    fetchToken();
  }, [token]);

  return { token, fetchToken };
};

export default useFetchRefreshToken;
