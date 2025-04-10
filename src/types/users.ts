import { RoleType } from "./agents";

export type UserType = {
  id: string;
  name: string;
  email: string;
  gender: string;
  state: string;
  country: string;
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
  role: string;
  roles: RoleType[];
};
