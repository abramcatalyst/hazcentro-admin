export type PayoutType = {
  name: string;
  transactionType: "payout" | "credit";
  state: string;
};
