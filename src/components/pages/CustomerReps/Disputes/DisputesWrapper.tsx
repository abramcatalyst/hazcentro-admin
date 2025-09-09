import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import DisputesTable from "./DisputesTable";
import DisputeTab from "./DisputeTab";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

export const tabOptionsObj = {
  ACTIVE: "ACTIVE",
  PENDING: "open",
  RESOLVED: "resolved",
};
export const tabOptions = [
  // {
  //   title: "Active",
  //   value: tabOptionsObj.ACTIVE,
  // },

  {
    title: "Pending",
    value: tabOptionsObj.PENDING,
  },
  {
    title: "Resolved",
    value: tabOptionsObj.RESOLVED,
  },
];

const DisputesWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <AppHeader text="Dispute" />
      </Box>
      <DisputeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DisputesTable selectedTab={selectedTab} />
      </ErrorBoundary>
    </Box>
  );
};

export default DisputesWrapper;
