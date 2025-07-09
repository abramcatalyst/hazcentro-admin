import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import UserStats from "../UserStats";
import LatestOrderTable from "../LatestOrderTable";
import ActiveOrders from "../ActiveOrders";
import Followers from "../Followers";
import { UserType } from "src/types/users";

type Props = {
  data: UserType;
};
const OverviewWrapper = ({ data }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={data} />
          <UserStats />
          <LatestOrderTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders />
          <Followers title={"Following"} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewWrapper;
