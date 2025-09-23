import axios from "axios";
import {
  CustomerCareOverviewDataType,
  CustomerCareTrendDataType,
} from "src/types/agents";
import {
  EscrowActiveBalanceType,
  EscrowChartResType,
  EscrowRecentTransactionType,
} from "src/types/escrow";
import { QueryFilterType } from "src/types/filters";
import { PendingPayoutType } from "src/types/payout";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchRecentTransactions = async ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<EscrowRecentTransactionType[]> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/wallets/escrow/recent-transactions?limit=${limit}${
      page ? `&page=${page}` : ""
    }${startDate ? `&minCreateDate=${startDate}` : ""}${
      endDate ? `&maxCreateDate=${endDate}` : ""
    }${lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""}${
      status ? `&status=${status === "true" ? true : false}` : ""
    }${search ? `&search=${search}` : ""}`
  );

  return data?.data;
};

export const fetchEscrowBalance =
  async (): Promise<EscrowActiveBalanceType> => {
    setDefaultHeaders();
    isAuthTokenExpired();
    const { data } = await axios.get(`${baseUrl}/admin/wallets/escrow`);

    return data;
  };

export const fetchAgentDashboardOverview =
  async (): Promise<CustomerCareOverviewDataType> => {
    setDefaultHeaders();
    isAuthTokenExpired();
    const { data } = await axios.get(`${baseUrl}/agents/dashboard`);

    return data?.data;
  };

export const fetchAgentDisputesTrends =
  async (): Promise<CustomerCareTrendDataType> => {
    setDefaultHeaders();
    isAuthTokenExpired();
    const { data } = await axios.get(`${baseUrl}/agents/disputes/trends`);

    return data?.data;
  };

export const fetchPendingPayouts = async ({
  page,
  limit,
  search,
  status,
  startDate,
  endDate,
  lastLoginDate,
}: QueryFilterType): Promise<{
  data: PendingPayoutType[];
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
    `${baseUrl}/admin/wallets/escrow/pending-payouts?limit=${limit}${
      page ? `&page=${page}` : ""
    }${startDate ? `&minCreateDate=${startDate}` : ""}${
      endDate ? `&maxCreateDate=${endDate}` : ""
    }${lastLoginDate ? `&lastLoginDate=${lastLoginDate}` : ""}${
      status ? `&status=${status === "true" ? true : false}` : ""
    }${search ? `&search=${search}` : ""}`
  );

  return data;
};

export const fetchEscrowChart = async (): Promise<EscrowChartResType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/wallets/escrow/monthly-chart`
  );

  return data;
};
