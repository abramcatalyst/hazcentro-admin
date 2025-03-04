import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
// import RecentActivities from "./RecentActivities";
import MapActivities from "./MapActivities";
import RecentClose from "./RecentClose";
import RecentNotifications from "../RecentNotifications";

const OverviewWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <MapActivities />
          {/* <RecentActivities /> */}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RecentNotifications />
          <RecentClose />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewWrapper;
