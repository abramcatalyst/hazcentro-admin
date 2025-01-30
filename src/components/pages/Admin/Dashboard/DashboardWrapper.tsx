import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import DashboardTop from "./DashboardTop";
import TrendingProducts from "./TrendingProducts";
import SalesBySectionWrapper from "./SalesBySection/SalesBySectionWrapper";
import LatestOrderTable from "./LatestOrderTable";

const DashboardWrapper = () => {
  return (
    <div>
      <DashboardTop />
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 7, md: 8 }}></Grid>
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <SalesBySectionWrapper />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 7, md: 8 }}>
            <LatestOrderTable />
          </Grid>
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <TrendingProducts />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashboardWrapper;
