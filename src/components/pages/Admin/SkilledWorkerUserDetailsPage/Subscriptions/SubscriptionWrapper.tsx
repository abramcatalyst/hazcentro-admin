import Box from "@mui/material/Box";
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionInfo from "./SubscriptionInfo";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchWorkerSubscriptions } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import UserHeader from "../UserHeader";
import { UserType } from "src/types/users";

type Props = {
  userData: UserType;
};
const SubscriptionWrapper = ({ userData }: Props) => {
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_WORKER_SUBSCRIPTIONS, { id }],
    queryFn: () => fetchWorkerSubscriptions({ id: id }),
  });
  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  console.log("data", data);
  return (
    <Box sx={{ width: "100%" }}>
      <UserHeader data={userData} />

      <SubscriptionInfo />
      <SubscriptionTable />
    </Box>
  );
};

export default SubscriptionWrapper;
