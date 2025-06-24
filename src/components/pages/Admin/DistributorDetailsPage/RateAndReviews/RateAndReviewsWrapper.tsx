import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SubscriptionTable from "./RateAndReviewsTable";
import ActiveOrders from "../ActiveOrders";
import PerformanceStats from "../PerformanceStats";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchVendorOverviewData } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import { useState } from "react";
import RateAndReviewsTab from "./RateAndReviewsTab";

export const tabOptionsObj = {
  RATE_AND_REVIEWS: "RATE_AND_REVIEWS",
};
export const rateAndReviewTabOptions = [
  {
    title: "Rate & Reviews",
    value: tabOptionsObj.RATE_AND_REVIEWS,
  },
];

const RateAndReviewsWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(
    tabOptionsObj.RATE_AND_REVIEWS
  );
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_OVERVIEW,
      { id },
    ],
    queryFn: () => fetchVendorOverviewData({ id: id }),
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
          <Box
            sx={{ py: 1, px: 0.6, background: "#ffffff", borderRadius: "12px" }}
          >
            <RateAndReviewsTab
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <SubscriptionTable />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PerformanceStats />
          <ActiveOrders data={data} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RateAndReviewsWrapper;
