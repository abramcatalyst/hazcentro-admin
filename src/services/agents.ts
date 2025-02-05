import axios from "axios";
import { AgentType } from "src/types/agents";
import { QueryFilterType } from "src/types/filters";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchAgents = async ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<{
  data: AgentType[];
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
    `${baseUrl}/global/categories?limit=${limit}${page ? `&page=${page}` : ""}${
      startDate ? `&minCreateDate=${startDate}` : ""
    }${endDate ? `&maxCreateDate=${endDate}` : ""}${
      lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""
    }${status ? `&status=${status === "true" ? true : false}` : ""}${
      search ? `&search=${search}` : ""
    }`
  );

  return data;
};
