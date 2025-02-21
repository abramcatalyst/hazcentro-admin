import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import UserStats from "../UserStats";
import LatestOrderTable from "../LatestOrderTable";
import ActiveOrders from "../ActiveOrders";
import Followers from "../Followers";

const OverviewWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <UserStats />
          <LatestOrderTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders />
          <Followers />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewWrapper;
