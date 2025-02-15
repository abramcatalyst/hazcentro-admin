import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
// import BuyersTable from "./Buyers/BuyersTable";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import ProfileInformation from "./ProfileInformation";
import ActiveAssignment from "./ActiveAssignment";
import SideNav from "./SideNav";
import LatestOrderTable from "./LatestOrderTable";

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

const UserDetailsPageWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(profileTabOptions[0].value);
  return (
    <Box>
      <Box
        sx={{
          display: { xs: "none", sm: "block" },

          mb: 1,
        }}
      >
        <AppHeader text="Agent Profile" />
      </Box>

      <Box my={1}>
        <Grid container spacing={1}>
          <Grid size={{ xs: false, sm: 2 }}>
            <SideNav
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <LatestOrderTable />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <ProfileInformation />
            <ActiveAssignment />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDetailsPageWrapper;
