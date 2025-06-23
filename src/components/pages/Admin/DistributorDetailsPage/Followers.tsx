import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { currencyFormater } from "src/utils";
import FollowerInfoBox from "src/components/shared/FollowerInfoBox/FollowerInfoBox";
import { VendorOverviewType } from "src/types/vendor";
import renderUserProfileImage from "src/utils/renderUserProfileImage";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type Props = {
  vendorOverviewData: VendorOverviewType;
};
const Followers = ({ vendorOverviewData }: Props) => {
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
          Followers (
          {currencyFormater(vendorOverviewData?.summary?.follower_count)})
        </Typography>
      </Box>
      {vendorOverviewData &&
      vendorOverviewData?.recent_followers?.length > 0 ? (
        vendorOverviewData?.recent_followers?.map((row) => (
          <Box
            key={row?.user_id}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FollowerInfoBox
              image={renderUserProfileImage({
                remoteImageUrl: row?.profile_picture,
                gender: row?.gender,
              })}
              title={row?.name}
              caption1={`User ID: ${row?.unique_user_id}`}
            />
            <Button size="small" color="success" sx={{ color: "#47B48E" }}>
              View profile
            </Button>
          </Box>
        ))
      ) : (
        <EmptyTable subText="No followers available" />
      )}
    </Box>
  );
};

export default Followers;
