import axios from "axios";
import { FAQType } from "src/types/faqs";
import { QueryFilterType } from "src/types/filters";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchFAQs = async ({
  page = 1,
  limit = 200,
}: QueryFilterType): Promise<FAQType[]> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(
    `${baseUrl}/admin/faqs?limit=${limit}${page ? `&page=${page}` : ""}`
  );

  return data?.data;
};
