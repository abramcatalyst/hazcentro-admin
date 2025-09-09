import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import AgentProfileTab from "./AgentsProfileTab";
// import BuyersTable from "./Buyers/BuyersTable";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import ProfileInformation from "./ProfileInformation";
import ActiveAssignment from "./ActiveAssignment";
import AssignmentsTable from "./AssignmentsTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useParams } from "react-router-dom";
import { fetchSingleAgent } from "src/services/agents";

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
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_AGENT, {}],
    queryFn: () => fetchSingleAgent(id || ""),
  });
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_AGENT],
      });
    };
  }, []);

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
            <ProfileInformation
              isPending={isPending}
              isError={isError}
              error={error}
              data={data}
            />
            <ActiveAssignment
              isPending={isPending}
              isError={isError}
              error={error}
              data={data}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AgentProfileWrapper;
