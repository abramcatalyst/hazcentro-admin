import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SideNav from "./SideNav";
import OverviewWrapper from "./Overview/OverviewWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import SavedWrapper from "./Saved/SavedWrapper";
import RequestWrapper from "./Request/RequestWrapper";
import { UserDetailsPageProps } from "src/pages/admin/AdminUserDetailsPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
// import FollowingsWrapper from "./Followings/FollowingsWrapper";
// import OrdersWrapper from "./Orders/OrdersWrapper";

export const usersPageTabOptionsObj = {
  OVERVIEW: "OVERVIEW",
  PROFILE: "PROFILE",
  SAVED: "SAVED",
  REQUEST: "REQUEST",
};
export const profileTabOptions = [
  {
    title: "Overview",
    value: usersPageTabOptionsObj.OVERVIEW,
  },
  {
    title: "Profile",
    value: usersPageTabOptionsObj.PROFILE,
  },
  {
    title: "Saved",
    value: usersPageTabOptionsObj.SAVED,
  },
  {
    title: "Request",
    value: usersPageTabOptionsObj.REQUEST,
  },
];

const SkilledWorkerUserDetailsPage = ({ data }: UserDetailsPageProps) => {
  const [selectedTab, setSelectedTab] = useState(profileTabOptions[0].value);
  return (
    <Box>
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: false, sm: 2 }}>
            <SideNav
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 10 }} container spacing={1}>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.OVERVIEW ? (
                <OverviewWrapper userData={data} />
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.PROFILE ? (
                <ProfileWrapper data={data} />
              ) : null}
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.SAVED ? (
                <SavedWrapper data={data} />
              ) : null}
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.REQUEST ? (
                <RequestWrapper userData={data} />
              ) : null}
            </ErrorBoundary>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SkilledWorkerUserDetailsPage;
