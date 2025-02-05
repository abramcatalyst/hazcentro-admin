import useAuthStore from "src/store/authStore";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeTokenFromStorage } from "src/utils";
// import { setAxiosDefaultHeaders } from "src/utils";

// setAxiosDefaultHeaders();
const useManageToken = () => {
  const { handleLogout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const logOutUser = useCallback(() => {
    const loginUrl = `/login?prevPath=${location.pathname}`;
    handleLogout();
    removeTokenFromStorage();
    navigate(loginUrl);
  }, []);

  return { logOutUser };
};

export default useManageToken;
