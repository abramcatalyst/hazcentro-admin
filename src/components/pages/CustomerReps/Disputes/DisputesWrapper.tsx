import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import DisputesTable from "./DisputesTable";
import DisputeTab from "./DisputeTab";
import { useState } from "react";

export const tabOptionsObj = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
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
      <DisputesTable />
    </Box>
  );
};

export default DisputesWrapper;
