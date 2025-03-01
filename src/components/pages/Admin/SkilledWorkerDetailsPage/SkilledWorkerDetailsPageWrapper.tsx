import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SideNav from "./SideNav";
import OverviewWrapper from "./Overview/OverviewWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import SavedWrapper from "./Saved/SavedWrapper";
import RequestWrapper from "./Request/RequestWrapper";
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

const SkilledWorkerDetailsPageWrapper = () => {
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
            {selectedTab === usersPageTabOptionsObj.OVERVIEW ? (
              <OverviewWrapper />
            ) : null}
            {selectedTab === usersPageTabOptionsObj.PROFILE ? (
              <ProfileWrapper />
            ) : null}
            {selectedTab === usersPageTabOptionsObj.SAVED ? (
              <SavedWrapper />
            ) : null}

            {selectedTab === usersPageTabOptionsObj.REQUEST ? (
              <RequestWrapper />
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SkilledWorkerDetailsPageWrapper;
