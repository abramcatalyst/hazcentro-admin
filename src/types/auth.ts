import { JwtPayload } from "jwt-decode";

export interface IToken extends JwtPayload {
  // email: string;
  sub: string;
  // createdAt: string;
  // exp: number;
  // hasVerifiedEmail: boolean;
  // iat: number;
  // name: string;
  // phone: string | null;
  // role: string;
  // status: boolean;
}

export type LoginRoleType = {
  id: string;
  name: string;
  guard_name: "web";
  created_at: string;
  updated_at: string;
  pivot: {
    model_type: string;
    model_id: string;
    role_id: string;
  };
};
export type LoginResponseProfileType = {
  id: string;
  name: string;
  email: string;
  gender: string;
  state: string;
  country: string;
  country_code: string;
  phone_number: string;
  status: "active";
  push_notification_status: "enabled";
  longitude: string;
  latitude: string | null;
  kyc_status: "pending";
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: "admin" | "customercare";
  roles: LoginRoleType[];
};
export type LoginResponseType = {
  access_token: string;
  token_type: "Bearer";
};
