import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import DisputeOverview from "./DisputeOverview";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchSingleDispute } from "src/services/disputes";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import DisputeMessageForm from "./DisputeMessageForm";
import SentMessages from "./SentMessages";

const DisputeDetailsWrapper = () => {
  const { id } = useParams();

  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_CUSTOMER_CARE_DISPUTE,
      { id },
    ],
    queryFn: () => fetchSingleDispute(id || ""),
  });

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  if (isPending) {
    return <HalfScreenLoader />;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          {<SentMessages data={data} />}
          <DisputeMessageForm />
          {/* <RecentCoveredAreas />
          <RecentActivities /> */}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box>
            <DisputeOverview data={data} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisputeDetailsWrapper;
