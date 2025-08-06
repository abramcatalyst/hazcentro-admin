import axios from "axios";
import { ReturnPolicyType } from "src/types/returnpolicy";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchReturnPolicy = async (): Promise<ReturnPolicyType[]> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/pages`);

  return data?.data;
};
