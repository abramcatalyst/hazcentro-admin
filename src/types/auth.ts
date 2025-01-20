import { JwtPayload } from "jwt-decode";

export interface IToken extends JwtPayload {
  email: string;
  sub: string;
  createdAt: string;
  exp: number;
  hasVerifiedEmail: boolean;
  iat: number;
  name: string;
  phone: string | null;
  role: string;
  status: boolean;
}
