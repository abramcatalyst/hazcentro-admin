export type SettingsType = {
  admin_email_for_alerts: {
    id: 1;
    key: "admin_email_for_alerts";
    value: string;
    type: "array";
    created_at: string;
    updated_at: string;
  };
  payout_preference: {
    id: 1;
    key: "payout_preference";
    value: string;
    type: "string";
    created_at: string;
    updated_at: string;
  };
};

export type SettingsDiscountType = {
  id: string;
  name: string;
  rate: string;
  start_date: string;
  end_date: string;
  applicable_categories: string[];
  is_active: boolean;
  override_vendor_discount: boolean;
  description: string;
  created_at: string;
  updated_at: string;
};

export type SettingsSummaryRecentTransactionType = {
  id: string;
  wallet_id: string;
  order_id: string;
  order_item_id: null;
  type: string;
  status: string;
  amount: string;
  description: string;
  meta: {
    payment_reference: string;
    vendor_id: string;
  };
  created_at: string;
  updated_at: string;
};

export type SettingsSummaryType = {
  available_funds: number;
  recent_transactions: SettingsSummaryRecentTransactionType[];
  e_commerce_sales: number;
  service_app_revenue: number;
};
