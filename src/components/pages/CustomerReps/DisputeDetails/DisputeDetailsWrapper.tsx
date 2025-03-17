import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "./UserHeader";
import DisputeOverview from "./DisputeOverview";

const DisputeDetailsWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          {/* <RecentCoveredAreas />
          <RecentActivities /> */}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box>
            <DisputeOverview />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisputeDetailsWrapper;
