import axios from "axios";
import { SettingsType } from "src/types/settings";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchSettings = async (): Promise<SettingsType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/setting`);

  return data;
};
