import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ActiveOrders from "../Overview/VisitedCategories";
import RequestTable from "./RequestTable";
import RecentServiceWorker from "../RecentServiceWorker";
import { UserType } from "src/types/users";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkerJobRequestData } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";

type Props = {
  userData: UserType;
};
const RequestWrapper = ({ userData }: Props) => {
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_WORKER_JOB_REQUESTS,
      { id },
    ],
    queryFn: () => fetchWorkerJobRequestData({ id: id }),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  console.log("ddddddddddddd", data);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={userData} />
          <RequestTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders />
          <RecentServiceWorker />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestWrapper;
