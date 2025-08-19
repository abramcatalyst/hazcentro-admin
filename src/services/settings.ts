import axios from "axios";
import { QueryFilterType } from "src/types/filters";
import {
  SettingsDiscountType,
  SettingsSummaryType,
  SettingsType,
} from "src/types/settings";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchSettings = async (): Promise<SettingsType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/setting`);

  return data;
};

export const fetchSettingDiscounts = async ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<{
  data: SettingsDiscountType[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  lings: {
    url: null | string;
    label: string;
    active: boolean;
  }[];
  next_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/category-discounts?limit=${limit}${
      page ? `&page=${page}` : ""
    }${startDate ? `&minCreateDate=${startDate}` : ""}${
      endDate ? `&maxCreateDate=${endDate}` : ""
    }${lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""}${
      status ? `&status=${status === "true" ? true : false}` : ""
    }${search ? `&search=${search}` : ""}`
  );

  return data;
};

export const fetchSettingSummary = async ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<SettingsSummaryType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/account/summary?limit=${limit}${
      page ? `&page=${page}` : ""
    }${startDate ? `&minCreateDate=${startDate}` : ""}${
      endDate ? `&maxCreateDate=${endDate}` : ""
    }${lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""}${
      status ? `&status=${status === "true" ? true : false}` : ""
    }${search ? `&search=${search}` : ""}`
  );

  return data;
};
