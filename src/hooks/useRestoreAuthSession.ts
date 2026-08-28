import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { restoreAuthSession } from "src/services/authSession";
import useAuthStore from "src/store/authStore";
import { removeTokenFromStorage, setDefaultHeaders } from "src/utils";
import { GLOBAL_ROUTE_LINKS } from "src/utils/routeLinks";

type Options = {
  redirectOnFailure?: boolean;
};

/**
 * Restore the admin session on mount, refreshing the JWT when needed.
 */
const useRestoreAuthSession = ({ redirectOnFailure = true }: Options = {}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { handleLogin } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const restore = async () => {
      setDefaultHeaders();
      const result = await restoreAuthSession();

      if (cancelled) {
        return;
      }

      if (result.ok) {
        handleLogin({ userProfile: result.profile });
        setIsReady(true);
        return;
      }

      if (redirectOnFailure) {
        removeTokenFromStorage();
        navigate(`${GLOBAL_ROUTE_LINKS.LOGIN}?prevPath=${pathname}`, {
          replace: true,
        });
        return;
      }

      setIsReady(true);
    };

    void restore();

    return () => {
      cancelled = true;
    };
  }, [handleLogin, navigate, pathname, redirectOnFailure]);

  return { isReady };
};

export default useRestoreAuthSession;
