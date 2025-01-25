import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";

const AccountWrapper = () => {
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
        <AppHeader text="Admin Account" />
      </Box>

      {/* <Box my={1}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <AssignmentsTable />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProfileInformation />
            <ActiveAssignment />
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
};

export default AccountWrapper;
