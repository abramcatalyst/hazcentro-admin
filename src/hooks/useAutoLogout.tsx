import { useEffect } from "react";
import useManageToken from "./useManageToken";
import { AxiosError } from "axios";
import { refreshAuthToken } from "src/services/authSession";

type Props = {
  error: AxiosError | Error | null;
};

const useAutoLogout = ({ error }: Props) => {
  const { logOutUser } = useManageToken();

  useEffect(() => {
    const handleUnauthorized = async () => {
      if (!error?.message.includes("code 401")) {
        return;
      }

      const refreshedToken = await refreshAuthToken();
      if (!refreshedToken) {
        logOutUser();
      }
    };

    void handleUnauthorized();
  }, [error, logOutUser]);

  return { error };
};

export default useAutoLogout;
