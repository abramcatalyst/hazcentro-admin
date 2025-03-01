import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ActiveOrders from "../Overview/VisitedCategories";
import RequestTable from "./RequestTable";
import RecentServiceWorker from "../RecentServiceWorker";

const RequestWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <RequestTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders />
          <RecentServiceWorker />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestWrapper;
