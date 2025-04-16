import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ActiveOrders from "../Overview/VisitedCategories";
import SavedWorkersSection from "./SavedWorkersSection";
import RecentServiceWorker from "../RecentServiceWorker";
import { UserType } from "src/types/users";

type Props = {
  data: UserType;
};
const SavedWrapper = ({ data }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={data} />
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
