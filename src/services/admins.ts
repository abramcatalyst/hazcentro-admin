import axios from "axios";
import { AdminDashboardStatsType } from "src/types/admin";
import { QueryFilterType } from "src/types/filters";
import { TrendingProductType } from "src/types/products";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";
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
    `${baseUrl}/admin/fetch-admins?limit=${limit}${
      page ? `&page=${page}` : ""
    }${startDate ? `&minCreateDate=${startDate}` : ""}${
      endDate ? `&maxCreateDate=${endDate}` : ""
    }${lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""}${
      status ? `&status=${status === "true" ? true : false}` : ""
    }${search ? `&search=${search}` : ""}`
  );

  return data?.data;
};

export const fetchAdminDashboardOverviewData =
  async (): Promise<AdminDashboardStatsType> => {
    setDefaultHeaders();
    isAuthTokenExpired();
    const { data } = await axios.get(`${baseUrl}/admin/dashboard/overview`);

    return data?.data;
  };

export const fetchAdminDashboardSalesInsights = async ({
  type,
}: QueryFilterType): Promise<AdminDashboardStatsType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/dashboard/sales-insights?type=${type}`
  );

  return data?.data;
};
export const fetchAdminDashboardTrendingProducts = async (): Promise<
  TrendingProductType[]
> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/dashboard/trending-products`
  );

  return data?.data;
};
