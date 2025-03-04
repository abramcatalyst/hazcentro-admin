import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import NotificationsTable from "./NotificationsTable";
import RecentClose from "../Overview/RecentClose";

const NotificationsWrapper = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <NotificationsTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {/* <ActiveOrders /> */}
          <RecentClose />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationsWrapper;
