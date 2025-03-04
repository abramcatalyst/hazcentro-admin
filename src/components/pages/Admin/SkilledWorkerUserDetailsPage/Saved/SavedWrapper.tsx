import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ActiveOrders from "../Overview/VisitedCategories";
import SavedWorkersSection from "./SavedWorkersSection";
import RecentServiceWorker from "../RecentServiceWorker";

const SavedWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <SavedWorkersSection />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders />
          <RecentServiceWorker />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SavedWrapper;
