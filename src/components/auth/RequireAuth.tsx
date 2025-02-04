import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "src/store/authStore";
import { getAuthToken, getProfileFromStorage } from "src/utils";

type Props = {
  children: React.ReactNode;
};
const RequireAuth = ({ children }: Props) => {
  const { handleLogout, handleLogin } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const loadUserData = async () => {
    // let decodedToken = jwtDecode<IToken>(token)
    const loginUrl = `/login?prevPath=${location.pathname}`;
    try {
      let token = getAuthToken();
      let profile = getProfileFromStorage() || "";
      if (!token) {
        handleLogout();
        return navigate(loginUrl);
      }

      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
          handleLogin({ userProfile: JSON.parse(profile) });
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Invalid token specified") {
        navigate(loginUrl);
      }
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);

  return <>{children}</>;
};

export default RequireAuth;
