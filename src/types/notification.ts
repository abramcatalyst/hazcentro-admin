export type NotificationType = {
  id: string;
  type: string;
  message: string;
  icon: string;
  meta:
    | { vendor_id: string; product: string; stock: number }
    | {
        vendor_id: string;
        amount: number;
      };
  created_at: string;
  updated_at: string;
  read: false;
};

export type MarkNotificationReadPayloadType = {
  id: number | string;
  queryKey: string;
};
