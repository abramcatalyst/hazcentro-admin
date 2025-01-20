import { useEffect } from "react";

import useAuthStore from "src/store/authStore";
import { axiosPrivate } from "src/api/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { profile } = useAuthStore();
  const handleRefreshToken = useRefreshToken();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = "Bearer " + profile?.accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const newAccessToken = handleRefreshToken();
          console.log("new access token: " + newAccessToken);
          prevRequest.headers["Authorization"] = newAccessToken;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [profile, handleRefreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
