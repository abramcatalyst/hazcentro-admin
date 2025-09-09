import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import DisputeChart from "./DisputeChart";
import DashboardTop from "./DashboardTop";
import PendingOrderTable from "./PendingOrderTable";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
const OverviewWrapper = () => {
  return (
    <Box>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DashboardTop />
      </ErrorBoundary>
      <Box>
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <DisputeChart />
        </ErrorBoundary>
      </Box>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <PendingOrderTable />
      </ErrorBoundary>
    </Box>
  );
};

export default OverviewWrapper;
