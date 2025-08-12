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
