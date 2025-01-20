import useAuthStore from "src/store/authStore";
import axios from "src/api/axios";
import { IToken } from "src/types/auth";
import { jwtDecode } from "jwt-decode";
// import { setAxiosDefaultHeaders } from "src/utils";

// setAxiosDefaultHeaders();
const useRefreshToken = () => {
  const { handleLogin } = useAuthStore();

  const handleRefreshToken = async () => {
    try {
      const response = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });
      const decoded = (await jwtDecode(response?.data?.accessToken)) as IToken;

      handleLogin({
        userProfile: decoded,
        accessToken: response?.data?.accessToken,
      });
    } catch (err) {
      console.log("Refresh token hook error", err);
    }
  };
  return handleRefreshToken;
};

export default useRefreshToken;
