import axios from "axios";
import {
  AdsCategoryProductType,
  AdsCategoryType,
  BannerType,
} from "src/types/banners";
import { QueryFilterType } from "src/types/filters";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchBanners = async ({
  page,
  limit,
  search,
  status,
  type,
}: QueryFilterType): Promise<{
  data: BannerType[];
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
    `${baseUrl}/admin/banners?limit=${limit}${page ? `&page=${page}` : ""}${
      type ? `&link_type=${type}` : ""
    }${status ? `&status=${status === "true" ? true : false}` : ""}${
      search ? `&search=${search}` : ""
    }`
  );

  return data?.data;
};

export const fetchSingleBanner = async (id: string): Promise<BannerType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/banners/${id}`);

  return data?.data;
};

export const fetchAdsCategories = async ({
  page,
  limit,
  search,
  status,
  type,
}: QueryFilterType): Promise<{
  data: AdsCategoryType[];
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
    `${baseUrl}/admin/categories-for-ads?limit=${limit}${
      page ? `&page=${page}` : ""
    }${type ? `&link_type=${type}` : ""}${
      status ? `&status=${status === "true" ? true : false}` : ""
    }${search ? `&search=${search}` : ""}`
  );

  return data?.data;
};

export const fetchSingleAdsCategoryProducts = async (
  id: string
): Promise<{
  data: AdsCategoryProductType[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: [];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/categories-for-ads/${id}`);

  return data;
};
