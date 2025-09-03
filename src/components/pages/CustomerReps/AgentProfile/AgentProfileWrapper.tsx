import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import ProfileInformation from "./ProfileInformation";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useParams } from "react-router-dom";
import { fetchSingleAgent } from "src/services/agents";

const AgentProfileWrapper = () => {
  const { id } = useParams();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_AGENT, {}],
    queryFn: () => fetchSingleAgent(id || ""),
  });
  console.log(isPending, error, data, isError);
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
        <AppHeader text="Customer Agent Profile" />
      </Box>

      <Box my={1}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <ProfileInformation />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AgentProfileWrapper;
