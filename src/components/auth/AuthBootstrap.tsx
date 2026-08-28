import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerSessionExpiredHandler,
  setupAxiosAuthInterceptors,
} from "src/services/authSession";
import useAuthStore from "src/store/authStore";
import { setDefaultHeaders } from "src/utils";
import { GLOBAL_ROUTE_LINKS } from "src/utils/routeLinks";

/**
 * Initialize axios auth headers and global 401 refresh handling.
 */
const AuthBootstrap = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuthStore();

  useEffect(() => {
    setDefaultHeaders();
    setupAxiosAuthInterceptors();

    registerSessionExpiredHandler(() => {
      handleLogout();
      navigate(GLOBAL_ROUTE_LINKS.LOGIN, { replace: true });
    });
  }, [handleLogout, navigate]);

  return null;
};

export default AuthBootstrap;
