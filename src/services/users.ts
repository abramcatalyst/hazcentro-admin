import axios from "axios";
import { QueryFilterType } from "src/types/filters";
import { FollowerType } from "src/types/followers";
import { UserType } from "src/types/users";
import { VendorOverviewType } from "src/types/vendor";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchUsers = async ({
  page,
  limit,
  search,
  status,
  role,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<{
  data: UserType[];
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
    `${baseUrl}/admin/users?limit=${limit}${page ? `&page=${page}` : ""}${
      role ? `&role=${role}` : ""
    }${endDate ? `&maxCreateDate=${endDate}` : ""}${
      lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""
    }${status ? `&status=${status === "true" ? true : false}` : ""}${
      search ? `&search=${search}` : ""
    }`
  );

  return data?.users;
};

export const fetchSingleUser = async (id: string): Promise<UserType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/users/${id}`);

  return data?.user;
};

export const fetchUserFollowers = async ({
  id,
  page,
  limit,
  search,
}: QueryFilterType): Promise<{
  data: FollowerType[];
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
    `${baseUrl}/admin/users/${id}/vendors-following?limit=${limit}${
      page ? `&page=${page}` : ""
    }${search ? `&search=${search}` : ""}`
  );
  return data?.data?.following;
};

export const fetchVendorOverviewData = async ({
  id,
}: QueryFilterType): Promise<VendorOverviewType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/vendors/${id}/dashboard-overview`
  );
  console.log("bbbbbbbbbbbbb", data?.data);
  return data?.data;
};
