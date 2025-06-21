import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PlaceHolderImg from "src/assets/images/placeholder.png";
import {
  currencyFormater,
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
} from "src/utils";
import FollowerInfoBox from "src/components/shared/FollowerInfoBox/FollowerInfoBox";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchUserFollowers } from "src/services/users";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import FullScreenLoader from "src/components/shared/FullScreenLoader/FullScreenLoader";

const FollowersTable = () => {
  const { id } = useParams();
  const [searchParams, _setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;

  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER_FOLLOWERS, { id }],
    queryFn: () => fetchUserFollowers({ id: id || "", page, limit }),
  });

  if (isPending) {
    return <FullScreenLoader />;
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
          Following ({currencyFormater(data?.total)})
        </Typography>
      </Box>
      <Box>
        {data?.data && data?.data?.length > 0 ? (
          data?.data?.map((row) => (
            <Box
              key={row?.id}
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
          <EmptyTable subText="No followers found" />
        )}
      </Box>
    </Box>
  );
};

export default FollowersTable;
