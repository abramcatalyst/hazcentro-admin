import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ActiveOrders from "../Overview/VisitedCategories";
import ProfileDetailsSection from "./ProfileDetailsSection";
import RecentClose from "../Overview/RecentClose";

const ProfileWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <ProfileDetailsSection />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders />
          <RecentClose />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileWrapper;
