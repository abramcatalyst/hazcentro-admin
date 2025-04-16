import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SideNav from "./SideNav";
import OverviewWrapper from "./Overview/OverviewWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import FollowingsWrapper from "./Followings/FollowingsWrapper";
import OrdersWrapper from "./Orders/OrdersWrapper";
import { UserDetailsPageProps } from "src/pages/admin/AdminUserDetailsPage";

export const usersPageTabOptionsObj = {
  OVERVIEW: "OVERVIEW",
  PROFILE: "PROFILE",
  ORDERS: "ORDERS",
  FOLLOWINGS: "FOLLOWINGS",
  MESSAGE: "MESSAGE",
  DISPUTE_LOG: "DISPUTE_LOG",
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
    title: "Orders",
    value: usersPageTabOptionsObj.ORDERS,
  },
  {
    title: "Followings",
    value: usersPageTabOptionsObj.FOLLOWINGS,
  },
  {
    title: "Message",
    value: usersPageTabOptionsObj.MESSAGE,
  },
  {
    title: "Dispute Log",
    value: usersPageTabOptionsObj.DISPUTE_LOG,
  },
];

const UserDetailsPageWrapper = ({ data }: UserDetailsPageProps) => {
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
              <OverviewWrapper data={data} />
            ) : null}
            {selectedTab === usersPageTabOptionsObj.PROFILE ? (
              <ProfileWrapper data={data} />
            ) : null}
            {selectedTab === usersPageTabOptionsObj.FOLLOWINGS ? (
              <FollowingsWrapper data={data} />
            ) : null}
            {selectedTab === usersPageTabOptionsObj.ORDERS ? (
              <OrdersWrapper />
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetailsPageWrapper;
