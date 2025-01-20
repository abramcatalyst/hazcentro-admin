import axios from "axios";
import { QueryFilterType } from "src/types/filters";
import { isAuthTokenExpired, setDefaultHeaders } from "src/utils";
import { AdminType } from "src/utils/types";

export const fetchAdmins = async ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<{
  data: AdminType[];
  message: string;
  totalCount: number;
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/admin/fetch-admins?limit=${limit}${
      page ? `&page=${page}` : ""
    }${startDate ? `&minCreateDate=${startDate}` : ""}${
      endDate ? `&maxCreateDate=${endDate}` : ""
    }${lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""}${
      status ? `&status=${status === "true" ? true : false}` : ""
    }${search ? `&search=${search}` : ""}`
  );

  return data?.data;
};
