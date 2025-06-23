import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserStats from "../UserStats";
import LatestOrderTable from "../LatestOrderTable";
import ActiveOrders from "../ActiveOrders";
import Followers from "../Followers";
import { UserType } from "src/types/users";
import UserHeader from "src/components/pages/Admin/UserDetailsPage/UserHeader";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchVendorOverviewData } from "src/services/users";
import { useParams } from "react-router-dom";
import { formatErrorMessage } from "src/utils";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";

type Props = {
  userData: UserType;
};
const OverviewWrapper = ({ userData }: Props) => {
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_OVERVIEW,
      { id },
    ],
    queryFn: () => fetchVendorOverviewData({ id: id }),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader data={userData} vendorOverviewData={data} />
          <UserStats data={data} />
          <LatestOrderTable vendorOverviewData={data} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ActiveOrders data={data} />
          <Followers vendorOverviewData={data} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverviewWrapper;
