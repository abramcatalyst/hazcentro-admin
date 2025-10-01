import axios from "axios";
import { NotificationType } from "src/types/notification";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchNotifications = async ({
  page,
  limit = 200,
  type,
  status,
}: {
  type?: "add_request" | "regular";
  status?: "true" | "false";
  limit?: number;
  page?: number;
}): Promise<{
  data: NotificationType[];
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/global/notifications${limit ? `?limit=${limit}` : ""}${
      page ? `&page=${page}` : ""
    }${type ? `&type=${type}` : ""}${status ? `&status=${status}` : ""}`
  );

  return data?.data;
};
