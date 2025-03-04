import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import RecentActivities from "./RecentActivities";
import VisitedCategories from "./VisitedCategories";
import RecentCoveredAreas from "./RecentCoveredAreas";
import RecentClose from "./RecentClose";

const OverviewWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <RecentCoveredAreas />
          <RecentActivities />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <VisitedCategories />
          <RecentClose />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewWrapper;
