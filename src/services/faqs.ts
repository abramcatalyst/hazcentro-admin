import axios from "axios";
import { FAQType } from "src/types/faqs";
import { QueryFilterType } from "src/types/filters";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchFAQs = async ({
  page = 1,
  limit = 200,
}: QueryFilterType): Promise<{
  data: FAQType[];
  pagination: {
    current_page: number;
    last_page: number;
    next_page: number;
    per_page: number;
    total: number;
  };
}> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/orders?limit=${limit}${page ? `&page=${page}` : ""}`
  );

  return data;
};
