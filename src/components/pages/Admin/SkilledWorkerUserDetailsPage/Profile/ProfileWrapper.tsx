import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ActiveOrders from "../Overview/VisitedCategories";
import ProfileDetailsSection from "./ProfileDetailsSection";
import RecentClose from "../Overview/RecentClose";
import { UserType } from "src/types/users";

type Props = {
  data: UserType;
};
const ProfileWrapper = ({ data }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={data} />
          <ProfileDetailsSection data={data} />
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
