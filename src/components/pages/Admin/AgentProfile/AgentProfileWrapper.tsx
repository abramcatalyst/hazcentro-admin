import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import AgentProfileTab from "./AgentsProfileTab";
// import BuyersTable from "./Buyers/BuyersTable";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import ProfileInformation from "./ProfileInformation";
import ActiveAssignment from "./ActiveAssignment";
import AssignmentsTable from "./AssignmentsTable";

export const usersPageTabOptionsObj = {
  ALL: "",
  COMPLETED: "completed",
  INCOMPLETE: "processing",
};

export const ordersTabOptions = [
  {
    title: "All",
    value: usersPageTabOptionsObj.ALL,
  },
  {
    title: "Completed",
    value: usersPageTabOptionsObj.COMPLETED,
  },
  {
    title: "Incomplete",
    value: usersPageTabOptionsObj.INCOMPLETE,
  },
];

const AgentProfileWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(ordersTabOptions[0].value);
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
        <AppHeader text="Agent Profile" />
      </Box>
      <AgentProfileTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <Box my={1}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <AssignmentsTable selectedTab={selectedTab} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProfileInformation />
            <ActiveAssignment />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AgentProfileWrapper;
