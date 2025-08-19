import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import AccountBalance from "./AccountBalance";
import AccountBalanceDetails from "./AccountBalanceDetails";
import RecentTransactions from "./RecentTransactions";
// import SavedAccounts from "./SavedAccounts";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchSettingSummary } from "src/services/settings";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";

const AccountWrapper = () => {
  const { error, data, isError, isPending } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS_SUMMARY, {}],
    queryFn: () => fetchSettingSummary({}),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  console.log("dddddddddddd", data);
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
              <AccountBalance data={data} />
              <AccountBalanceDetails data={data} />
            </Box>{" "}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RecentTransactions data={data} />
            {/* <SavedAccounts /> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountWrapper;
