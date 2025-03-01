import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsUserAuthorized from "src/hooks/useIsUserAuthorized";
import { GLOBAL_ROUTE_LINKS } from "src/utils/routeLinks";

type Props = {
  allowedPermission: string;
  children: React.ReactNode;
};
const RoleAuth = ({ children, allowedPermission }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthorized } = useIsUserAuthorized();
  const loadUserData = async () => {
    let isAllowed = isAuthorized(allowedPermission);
    if (!isAllowed) {
      navigate(GLOBAL_ROUTE_LINKS.LOGIN, { replace: true });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    loadUserData();
  }, [location?.pathname]);

  return <>{children}</>;
};

export default RoleAuth;
