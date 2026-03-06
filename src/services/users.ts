import axios from "axios";
import { VendorActivityType } from "src/types/activities";
import { VendorProductCategoryType } from "src/types/categories";
import { EscrowResType } from "src/types/escrow";
import { FeedType } from "src/types/feeds";
import { QueryFilterType } from "src/types/filters";
import { FollowerType, VendorFullFollowerType } from "src/types/followers";
import { PaginationMetaType } from "src/types/pagination";
import { RateType } from "src/types/rates";
import { SubscriptionResType } from "src/types/subscription";
import { UserType } from "src/types/users";
import { VendorOverviewType } from "src/types/vendor";
import { JobRequestType, WorkerOverviewType } from "src/types/workers";
import {
  baseUrl,
  isAuthTokenExpired,
  rowsPerPageOptions,
  setDefaultHeaders,
} from "src/utils";

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
    }`,
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
    }${search ? `&search=${search}` : ""}`,
  );
  return data?.data?.following;
};

export const fetchVendorOverviewData = async ({
  id,
}: QueryFilterType): Promise<VendorOverviewType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/vendors/${id}/dashboard-overview`,
  );
  return data?.data;
};

export const fetchVendorCategoriesAndActivityData = async ({
  id,
}: QueryFilterType): Promise<{
  categories: VendorProductCategoryType[];
  recent_activities: VendorActivityType[];
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/vendors/${id}/category`);
  return data;
};

export const fetchVendorSubscriptionsData = async ({
  id,
}: QueryFilterType): Promise<SubscriptionResType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/vendors/${id}/subscriptions`,
  );
  return data;
};

export const fetchVendorRatesAndReviewsData = async ({
  id,
  limit = 20,
  page,
}: QueryFilterType): Promise<{
  data: RateType[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: [
      {
        url: string | null;
        label: string;
        active: boolean;
      },
      {
        url: string;
        label: string;
        active: boolean;
      },
      {
        url: string | null;
        label: "Next &raquo;";
        active: boolean;
      },
    ];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/vendors/${id}/reviews?limit=${limit}${
      page ? `&page=${page}` : ""
    }`,
  );
  return data;
};

export const fetchVendorFeedsAndFollowersData = async ({
  id,
  limit,
}: QueryFilterType): Promise<{
  feeds: {
    data: FeedType[];

    meta: {
      current_page: number;
      from: null;
      last_page: number;
      per_page: number;
      to: null;
      total: number;
    };
  };
  followers: {
    data: VendorFullFollowerType[];

    meta: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
      total_followers: number;
    };
  };
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/vendors/${id}/feeds-followers?limit=${limit}`,
  );
  return data;
};

export const fetchVendorEscrowData = async ({
  id,
}: QueryFilterType): Promise<EscrowResType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/vendors/${id}/escrow`);
  return data;
};

export const fetchWorkerOverviewData = async ({
  id,
}: QueryFilterType): Promise<WorkerOverviewType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/workers/${id}/overview`);
  return data?.data;
};

export const fetchWorkerJobRequestData = async ({
  id,
  limit = rowsPerPageOptions[0],
  page,
}: QueryFilterType): Promise<{
  data: JobRequestType[];
  meta: PaginationMetaType;
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/workers/${id}/job-requests?limit=${limit}${page ? `&page=${page}` : ""}`,
  );
  return data;
};
