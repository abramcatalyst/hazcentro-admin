export type SettingsType = {
  admin_email_for_alerts: {
    id: 1;
    key: "admin_email_for_alerts";
    value: string;
    type: "array";
    created_at: string;
    updated_at: string;
  };
  delivery_fee_same_state: {
    id: number;
    key: "delivery_fee_same_state";
    value: string;
    type: "float";
    created_at: string;
    updated_at: string;
  };
  delivery_fee_different_state: {
    id: number;
    key: "delivery_fee_different_state";
    value: string;
    type: "float";
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

  tax_rate_percentage: {
    id: number;
    key: "tax_rate_percentage";
    value: string;
    type: "float";
    created_at: string;
    updated_at: string;
  };
  contact_emails: {
    id: number;
    key: "contact_emails";
    value: string; // stringified array,
    type: "array";
    created_at: string;
    updated_at: string;
  };
  contact_phone_numbers: {
    id: number;
    key: "contact_phone_numbers";
    value: string; // stringified array,
    type: "array";
    created_at: string;
    updated_at: string;
  };
  whatsapp_line: {
    id: number;
    key: "whatsapp_line";
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
