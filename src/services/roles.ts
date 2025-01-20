import axios from "axios";
import { isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchRoles = async ({
  userType,
}: {
  userType?: string;
}): Promise<{
  data: string[];
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/fetch-roles?userType=${userType}`
  );

  return data?.data;
};
