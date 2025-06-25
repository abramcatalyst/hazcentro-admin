import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "src/assets/images/logo2.png";
import { useTheme } from "@mui/material/styles";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { VendorFullFollowerType } from "src/types/followers";

const FollowersItem = ({ data }: { data: VendorFullFollowerType }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        mb: 1.4,
        borderBottom: `1px solid`,
        borderBottomColor: theme.palette.grey[200],
        p: 0.5,
        pb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.3,
          p: 0.5,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img
            src={data?.follower_details?.profile_picture || Logo}
            style={{
              objectFit: "contain",
              width: "44px",
              height: "44px",
              borderRadius: "8px",
            }}
            alt="logo"
          />{" "}
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {data?.follower_details?.name}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>{data?.user_id}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  data: {
    data: VendorFullFollowerType[];

    meta: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
      total_followers: number;
    };
  };
};
function FollowersTable({ data }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        my: 1,
        background: "#ffffff",
        py: 1,
        px: { xs: 0.5, sm: 1 },
        borderRadius: "25px",
      }}
    >
      <Box>
        {data && data?.data?.length > 0 ? (
          data?.data?.map((row) => {
            return <FollowersItem key={row?.id} data={row} />;
          })
        ) : (
          <EmptyTable subText="No Content Available" />
        )}
      </Box>
    </Box>
  );
}

export default FollowersTable;
