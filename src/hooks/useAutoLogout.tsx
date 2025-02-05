import { useEffect } from "react";
import useManageToken from "./useManageToken";
import { AxiosError } from "axios";

type Props = {
  error: AxiosError | Error | null;
};
const useAutoLogout = ({ error }: Props) => {
  const { logOutUser } = useManageToken();
  useEffect(() => {
    // console.log("mmmmmmmmmmmmmmmmm", error);
    if (error?.message.includes("code 401")) {
      logOutUser();
    }
  }, []);
  return { error: error };
};

export default useAutoLogout;
