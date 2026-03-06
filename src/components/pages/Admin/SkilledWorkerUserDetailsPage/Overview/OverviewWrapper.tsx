import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import RecentActivities from "./RecentActivities";
import Portfolios from "./Portfolios";
import RecentCoveredAreas from "./RecentCoveredAreas";
// import RecentClose from "./RecentClose";
import { UserType } from "src/types/users";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchWorkerOverviewData } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";

type Props = {
  userData: UserType;
};
const OverviewWrapper = ({ userData }: Props) => {
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_WORKER_OVERVIEW,
      { id },
    ],
    queryFn: () => fetchWorkerOverviewData({ id: id }),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={userData} />
          <RecentCoveredAreas />
          <RecentActivities recent_activities={data?.recent_activities} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Portfolios portfolios={data?.portfolios} />
          {/* <RecentClose /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewWrapper;
