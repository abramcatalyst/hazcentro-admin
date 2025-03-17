import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import DisputeChart from "./DisputeChart";
import DashboardTop from "./DashboardTop";
import PendingOrderTable from "./PendingOrderTable";
const OverviewWrapper = () => {
  return (
    <Box>
      <DashboardTop />
      <Box>
        <DisputeChart />
      </Box>
      <PendingOrderTable />
    </Box>
  );
};

export default OverviewWrapper;
