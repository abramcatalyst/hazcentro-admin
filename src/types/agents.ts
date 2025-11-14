export type SubCategoryType = {
  id: string;
  name: string;
  description: string;
  parent_id: string;
  user_id: string;
  icon: string | null;
  is_featured: boolean;
  sort_order: string | null;
  depth: number;
  status: string;
  created_at: string;
  updated_at: string;
  total_products: number;
  media: [];
};
export type ManagedOrderType = {
  id: string;
  user_id: string | null;
  agent_id: string;
  total_price: string;
  payment_status: string;
  payment_reference: string | null;
  status: string;
  buyer_confirmed_at: string | null;
  tracking_id: string;
  created_at: string;
  updated_at: string;
};
export type RoleType = {
  id: string;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: string;
    role_id: string;
  };
};
export type AgentType = {
  id: string;
  unique_user_id: string;
  name: string;
  email: string;
  completed_orders: number;
  incomplete_orders: number;
  gender: "female" | "male";
  state: string;
  country: string;
  country_code: string;
  phone_number: string;
  status: string;
  push_notification_status: string;
  longitude: string;
  latitude: string;
  address: string;
  kyc_status: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  role: "agent";
  states: {
    created_at: string;
    state: string;
    updated_at: string;
    user_id: string;
  }[];
  managed_orders: ManagedOrderType[];
  roles: RoleType[];
  recent_orders: {
    created_at: string;
    id: string;
    status: string;
    total_price: number;
    tracking_id: string;
  }[];
};

export type CustomerCareOverviewDataType = {
  orders_needing_attention: number;
  total_open_disputes: number;
  avg_resolution_time_days: number;
  dispute_resolved_today: number;
};

export type CustomerCareTrendDataType = { month: string; value: number }[];

export type DropInformationType = {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  phone_number: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};
