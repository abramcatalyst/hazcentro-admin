import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ActiveOrders from "../ActiveOrders";
import PerformanceStats from "../PerformanceStats";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import {
  fetchVendorFeedsAndFollowersData,
  fetchVendorOverviewData,
} from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import { useState } from "react";
import FollowersTable from "./FollowersTable";
import FeedsTable from "./FeedsTable";
import CustomTab from "src/components/shared/CustomTab/CustomTab";

export const tabOptionsObj = {
  FEED_POSTS: "FEED_POSTS",
  FOLLOWERS: "FOLLOWERS",
};
export const feedAndFollowersTabOptions = [
  {
    title: "Feed Posts",
    value: tabOptionsObj.FEED_POSTS,
  },
  // {
  //   title: "Followers",
  //   value: tabOptionsObj.FOLLOWERS,
  // },
];

const FeedAndFollowersWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptionsObj.FOLLOWERS);
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_OVERVIEW,
      { id },
    ],
    queryFn: () => fetchVendorOverviewData({ id: id }),
  });

  const {
    error: errorFeedAndFollowers,
    data: dataFeedAndFollowers,
    isError: isErorFeedAndFollowers,
    isPending: isPendingFeedAndFollowers,
  } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_FEEDS_AND_FOLLOWERS,
      { id },
    ],
    queryFn: () => fetchVendorFeedsAndFollowersData({ id: id, limit: 30 }),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  const handleClick = (value: string) => {
    setSelectedTab(value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{ py: 1, px: 0.6, background: "#ffffff", borderRadius: "12px" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 0.3,
                  mt: 0.8,
                }}
              >
                <CustomTab
                  handleClick={handleClick}
                  value={tabOptionsObj.FOLLOWERS}
                  title={`Followers (${
                    dataFeedAndFollowers?.followers?.meta?.total_followers || 0
                  })`}
                  active={tabOptionsObj.FOLLOWERS === selectedTab}
                  size="small"
                />
              </Box>
            </Box>

            <>
              {selectedTab === tabOptionsObj.FEED_POSTS && (
                <>
                  {isPendingFeedAndFollowers ? (
                    <HalfScreenLoader />
                  ) : isErorFeedAndFollowers ? (
                    <HalfScreenError
                      text={formatErrorMessage(errorFeedAndFollowers)}
                    />
                  ) : (
                    <FeedsTable data={dataFeedAndFollowers?.feeds} />
                  )}{" "}
                </>
              )}
            </>

            <>
              {selectedTab === tabOptionsObj.FOLLOWERS && (
                <>
                  {isPendingFeedAndFollowers ? (
                    <HalfScreenLoader />
                  ) : isErorFeedAndFollowers ? (
                    <HalfScreenError
                      text={formatErrorMessage(errorFeedAndFollowers)}
                    />
                  ) : (
                    <FollowersTable data={dataFeedAndFollowers?.followers} />
                  )}{" "}
                </>
              )}
            </>
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

export default FeedAndFollowersWrapper;
