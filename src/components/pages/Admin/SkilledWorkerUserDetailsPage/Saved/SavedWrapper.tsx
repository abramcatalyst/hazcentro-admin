import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import Portfolios from "../Overview/Portfolios";
import SavedWorkersSection from "./SavedWorkersSection";
import RecentServiceWorker from "../RecentServiceWorker";
import { UserType } from "src/types/users";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchWorkerOverviewData } from "src/services/users";

type Props = {
  data: UserType;
};
const SavedWrapper = ({ data }: Props) => {
  const params = useParams();
  const { id } = params;
  const { data: workerOverview } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_WORKER_OVERVIEW,
      { id },
    ],
    queryFn: () => fetchWorkerOverviewData({ id: id }),
  });
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={data} />
          <SavedWorkersSection />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Portfolios
            portfolios={workerOverview ? workerOverview?.portfolios : []}
          />
          <RecentServiceWorker />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SavedWrapper;
