import { RoleType } from "./agents";
import { VendorEscrowOrderType } from "./orders";
import { PayoutType } from "./payout";

export type EscrowResType = {
  summary: {
    balance: string;
    active_escrow_count: number;
    delivered_amount: number;
    incoming_payment_count: number;
    dispute_log_count: number;
  };
  active_orders: VendorEscrowOrderType[];
  delivered_orders: VendorEscrowOrderType[];
  recent_payouts: PayoutType[];
};

export type EscrowActiveBalanceType = { active_escrow_balance: number };

export type EscrowRecentTransactionType = {
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
  wallet: {
    id: string;
    user_id: string;
    available_balance: string;
    created_at: string;
    updated_at: string;
    user: {
      id: string;
      unique_user_id: string;
      name: string;
      email: string;
      gender: string;
      state: string;
      country: string;
      country_code: string;
      phone_number: string;
      status: string;
      last_seen_at: string;
      push_notification_status: string;
      longitude: string | null;
      latitude: string | null;
      address: string | null;
      kyc_status: string;
      email_verified_at: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
      role: string;
      roles: RoleType[];
    };
  };
};
