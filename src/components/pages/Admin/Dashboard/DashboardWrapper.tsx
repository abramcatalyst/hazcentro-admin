import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import DashboardTop from "./DashboardTop";
import TrendingProducts from "./TrendingProducts";
import SalesBySectionWrapper from "./SalesBySection/SalesBySectionWrapper";
import LatestOrderTable from "./LatestOrderTable";
import BalanceSection from "../Escrow/BalanceSection";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchAdminDashboardOverviewData } from "src/services/admins";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { formatErrorMessage } from "src/utils";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";

const DashboardWrapper = () => {
  const { error, data, isError, isPending } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_DASHBOARD_OVERVIEW],
    queryFn: () => fetchAdminDashboardOverviewData(),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <div>
      <DashboardTop data={data} />
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <BalanceSection />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SalesBySectionWrapper />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <LatestOrderTable />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TrendingProducts />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default DashboardWrapper;
