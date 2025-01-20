import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "src/components/layouts/SuperAdminLayout/navLinks";
import useIsUserAuthorized from "src/hooks/useIsUserAuthorized";

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
      navigate(navLinks.UNAUTHORIZED, { replace: true });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    loadUserData();
  }, [location?.pathname]);

  return <>{children}</>;
};

export default RoleAuth;
