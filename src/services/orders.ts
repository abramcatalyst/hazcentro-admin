import axios from "axios";
import { QueryFilterType } from "src/types/filters";
import { OrderType } from "src/types/orders";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchOrders = async ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<{
  data: OrderType[];
  pagination: {
    current_page: number;
    last_page: number;
    next_page: number;
    per_page: number;
    total: number;
  };
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/orders?limit=${limit}${page ? `&page=${page}` : ""}${
      startDate ? `&minCreateDate=${startDate}` : ""
    }${endDate ? `&maxCreateDate=${endDate}` : ""}${
      lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""
    }${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`
  );

  return data;
};

export const fetchSingleOrder = async (id: string): Promise<OrderType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/admin/orders/${id}`);

  return data?.data;
};

export const fetchAgentAssignedOrders = async ({
  page,
  limit,
  search,
  status,
  startDate,
  lastLoginDate,
  userId,
}: QueryFilterType): Promise<{
  data: OrderType[];
  pagination: {
    current_page: number;
    last_page: number;
    next_page: number;
    per_page: number;
    total: number;
  };
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/orders?limit=${limit}${page ? `&page=${page}` : ""}${
      startDate ? `&minCreateDate=${startDate}` : ""
    }${userId ? `&agent_id=${userId}` : ""}${
      lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""
    }${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`
  );

  return data;
};
