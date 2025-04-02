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
  managed_orders: [];
  roles: RoleType[];
};
