import axios from "axios";
import { QueryFilterType } from "src/types/filters";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";
import { AdminType } from "src/utils/types";

export const fetchSettings = async ({
  page,
  limit,
}: QueryFilterType): Promise<{
  data: AdminType[];
  message: string;
  totalCount: number;
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/setting?limit=${limit}${page ? `&page=${page}` : ""}`
  );

  return data?.data;
};
