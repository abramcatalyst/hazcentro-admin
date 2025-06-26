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
