import { UserType } from "./users";

export type PayoutType = {
  type: string;
  amount: string;
  user: string;
  label: string;
  timestamp: string;
  status: string;
};

export type PendingPayoutType = {
  id: string;
  wallet_id: string;
  order_id: string | null;
  order_item_id: string | null;
  type: "debit";
  status: string;
  amount: string;
  description: string;
  meta: {
    withdrawal_details: {
      bank_id: string;
      bank_name: string;
      account_number: string;
    };
  };
  created_at: string;
  updated_at: string;
  wallet: {
    id: string;
    user_id: string;
    available_balance: string;
    created_at: string;
    updated_at: string;
    user: UserType;
  };
};
