import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import DisputesTable from "./DistributorsTable";
import DisputeTab from "./DistributorsTab";
import { useState } from "react";
import DistributorsStats from "./DistributorsStats";

export const tabOptionsObj = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  UNAPPROVED: "UNAPPROVED",
};
export const tabOptions = [
  {
    title: "Pending Review",
    value: tabOptionsObj.PENDING,
  },

  {
    title: "Approved",
    value: tabOptionsObj.APPROVED,
  },
  {
    title: "Unapproved",
    value: tabOptionsObj.UNAPPROVED,
  },
];

const DistributorsWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);

  return (
    <Box>
      <DisputeTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Box
        sx={{
          mb: 2,
        }}
      >
        <AppHeader text="Distributors" />
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <DisputesTable />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box>
              <DistributorsStats />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DistributorsWrapper;
