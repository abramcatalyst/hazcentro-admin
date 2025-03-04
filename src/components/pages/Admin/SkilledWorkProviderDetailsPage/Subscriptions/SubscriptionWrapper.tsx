import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SubscriptionTable from "./SubscriptionTable";
import RecentClose from "../Overview/RecentClose";
import SubscriptionInfo from "./SubscriptionInfo";
import RecentNotifications from "../RecentNotifications";

const SubscriptionWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <SubscriptionInfo />
          <SubscriptionTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RecentNotifications />
          <RecentClose />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubscriptionWrapper;
