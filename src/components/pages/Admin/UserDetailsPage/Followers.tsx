import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PlaceHolderImg from "src/assets/images/placeholder.png";
import { currencyFormater, formatErrorMessage } from "src/utils";
import FollowerInfoBox from "src/components/shared/FollowerInfoBox/FollowerInfoBox";
import { useQuery } from "@tanstack/react-query";
import { fetchUserFollowers } from "src/services/users";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { useParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import OrderSkeletonLoader from "src/components/shared/OrderSkeletonLoader/OrderSkeletonLoader";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type Props = {
  title?: string;
};
const Followers = ({ title = "Followers" }: Props) => {
  const { id } = useParams();

  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER_FOLLOWERS, { id }],
    queryFn: () => fetchUserFollowers({ id: id || "", limit: 4 }),
  });

  if (isPending) {
    return (
      <Box>
        <OrderSkeletonLoader />
        <OrderSkeletonLoader />
        <OrderSkeletonLoader />
      </Box>
    );
  }
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <Box
      component={Paper}
      sx={{ mb: 1, p: 1, borderRadius: "20px" }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
          {title} ({currencyFormater(data?.total)})
        </Typography>
      </Box>
      {data?.data && data?.data?.length > 0 ? (
        data?.data?.map((row) => (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FollowerInfoBox
              image={PlaceHolderImg}
              title={row?.followable_details?.business_name}
              caption1={row?.followable_details?.name}
            />
            <Button size="small" color="success" sx={{ color: "#47B48E" }}>
              View profile
            </Button>
          </Box>
        ))
      ) : (
        <EmptyTable isSmall subText="No followers found" />
      )}
    </Box>
  );
};

export default Followers;
