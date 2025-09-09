import axios from "axios";
import { SingleDisputeType } from "src/types/disputes";
import { baseUrl, isAuthTokenExpired, setDefaultHeaders } from "src/utils";

export const fetchSingleDispute = async (
  id: string
): Promise<SingleDisputeType> => {
  setDefaultHeaders();
  isAuthTokenExpired();
  const { data } = await axios.get(`${baseUrl}/agents/disputes/${id}`);

  return data?.dispute;
};
