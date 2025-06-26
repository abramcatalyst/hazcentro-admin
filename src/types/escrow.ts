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
