import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import DashboardTop from "./DashboardTop";
import TrendingProducts from "./TrendingProducts";

const DashboardWrapper = () => {
  return (
    <div>
      <DashboardTop />
      <Box>
        <Grid container>
          <Grid container size={{ xs: 12, sm: 7, md: 8 }}></Grid>
          <Grid container size={{ xs: 12, sm: 5, md: 4 }}>
            <TrendingProducts />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashboardWrapper;
