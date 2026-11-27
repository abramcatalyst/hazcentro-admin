export type AdminDashboardStatsType = {
  total_sales: {
    amount: number;
    change_pct: number;
  };
  total_orders: {
    count: number;
    change_pct: number;
  };
  total_users: {
    count: number;
    change_pct: number;
  };
  total_distributors: {
    count: number;
    change_pct: number;
  };
  active_escrow_balance: number;
};

export type SalesInsightBrandType = {
  id: string;
  name: string;
  total_revenue: string | number;
};

export type SalesInsightVendorType = {
  vendor_id: string;
  name: string;
  unique_user_id: string;
  total_revenue: string | number;
};
