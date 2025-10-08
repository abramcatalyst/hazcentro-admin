import axios from "axios";
import { NotificationType } from "src/types/notification";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchNotifications = async ({
  page,
  limit = 200,

  status,
}: {
  status?: "true" | "false";
  limit?: number;
  page?: number;
}): Promise<NotificationType[]> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/global/notifications${limit ? `?limit=${limit}` : ""}${
      page ? `&page=${page}` : ""
    }${status ? `&status=${status}` : ""}`
  );

  return data?.data;
};
