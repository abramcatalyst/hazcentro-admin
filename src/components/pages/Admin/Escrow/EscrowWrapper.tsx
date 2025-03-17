import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import BalanceSection from "./BalanceSection";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import RecentPayoutTable from "./RecentPayoutTable";

const EscrowWrapper = () => {
  return (
    <Box>
      <AppHeader text="Escro Dashboard" />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <BalanceSection />
          </ErrorBoundary>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <RecentPayoutTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EscrowWrapper;
