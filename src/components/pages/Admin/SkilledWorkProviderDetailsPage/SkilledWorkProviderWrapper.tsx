import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SideNav from "./SideNav";
import OverviewWrapper from "./Overview/OverviewWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import SubscriptionWrapper from "./Subscriptions/SubscriptionWrapper";
import NotificationsWrapper from "./Notifications/NotificationsWrapper";

export const usersPageTabOptionsObj = {
  OVERVIEW: "OVERVIEW",
  PROFILE: "PROFILE",
  SUBSCRIPTION: "SUBSCRIPTION",
  NOTIFICATION: "NOTIFICATION",
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
    title: "Subscription",
    value: usersPageTabOptionsObj.SUBSCRIPTION,
  },
  {
    title: "Notification",
    value: usersPageTabOptionsObj.NOTIFICATION,
  },
];

const SkilledWorkProviderWrapper = () => {
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

            {selectedTab === usersPageTabOptionsObj.SUBSCRIPTION ? (
              <SubscriptionWrapper />
            ) : null}

            {selectedTab === usersPageTabOptionsObj.NOTIFICATION ? (
              <NotificationsWrapper />
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SkilledWorkProviderWrapper;
