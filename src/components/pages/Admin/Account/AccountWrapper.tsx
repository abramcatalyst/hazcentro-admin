import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import AccountBalance from "./AccountBalance";
import AccountBalanceDetails from "./AccountBalanceDetails";
import RecentTransactions from "./RecentTransactions";

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

      <Box my={1}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ background: "#ffffff", borderRadius: "16px" }}>
              <AccountBalance />
              <AccountBalanceDetails />
            </Box>{" "}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RecentTransactions />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountWrapper;
