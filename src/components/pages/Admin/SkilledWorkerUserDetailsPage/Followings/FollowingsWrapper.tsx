import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
// import Portfolios from "../Overview/Portfolios";
import Followers from "../Overview/RecentClose";
import FollowersTable from "./FollowersTable";
import { UserType } from "src/types/users";

type Props = {
  data: UserType;
};
const FollowingsWrapper = ({ data }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={data} />
          <FollowersTable />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {/* <Portfolios /> */}
          <Followers />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FollowingsWrapper;
