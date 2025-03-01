import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ActiveOrders from "../Overview/VisitedCategories";
import Followers from "../Overview/RecentClose";
import FollowersTable from "./FollowersTable";

const FollowingsWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <FollowersTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders />
          <Followers />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FollowingsWrapper;
