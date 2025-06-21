import { RoleType } from "./agents";

export type UserType = {
  id: string;
  unique_user_id: string;
  name: string;
  email: string;
  gender: string;
  state: string;
  country: string;
  last_seen_at: string;
  country_code: string;
  phone_number: string;
  status: string;
  push_notification_status: string;
  longitude: string;
  latitude: string;
  kyc_status: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: "user" | "vendor" | "worker";
  roles: RoleType[];
};
