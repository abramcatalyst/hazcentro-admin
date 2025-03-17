import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import HintSection from "./HintSection";
import DistributorsStats from "./DistributorsStats";
import DocumentsSection from "./DocumentsSection";

const DistributorDetailsWrapper = () => {
  return (
    <Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <AppHeader text="Oriano Vendor" />
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{}}>
              <DocumentsSection />
              <HintSection />
            </Box>
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

export default DistributorDetailsWrapper;
