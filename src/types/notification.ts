import { UserType } from "./users";

export type NotificationType = {
  id: number;
  user_id: number;
  recipient_id: number;
  title: string;
  notification: string;
  is_add_request: false;
  request_user_id: null;
  request_user_type: string | null;
  request_status: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  user: UserType;
  request_user: UserType | null;
  recipient: UserType;
};

export type CreateAddRequestType = {
  notification_id: number;
  user_id: number;
  status: "approved" | "declined"; //"declined"
};

export type MarkNotificationReadPayloadType = {
  id: number | string;
  queryKey: string;
};
