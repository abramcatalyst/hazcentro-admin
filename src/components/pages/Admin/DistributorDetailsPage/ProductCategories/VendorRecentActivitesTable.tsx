import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "src/assets/images/logo.png";
import { VendorActivityType } from "src/types/activities";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type ActivityCardProps = {
  data: VendorActivityType;
};

const ActivityyCard = ({ data }: ActivityCardProps) => {
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "12px",
        py: 0.3,
        minHeight: "75px",
        my: 1,
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          pb: 1,
          px: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: "12px",
        }}
      >
        <img
          src={data?.image || Logo}
          alt={data?.reason}
          style={{
            objectFit: "cover",
            width: "58px",
            height: "50px",
            borderRadius: "6px",
          }}
        />
        <Box sx={{ width: "100%" }}>
          <Typography
            noWrap
            sx={{
              mb: 0.1,
              fontSize: { xs: "16px", sm: "18px" },
            }}
          >
            {data?.product_name}
          </Typography>

          <Box sx={{ display: "flex", gap: 0.3, alignItems: "baseline" }}>
            <Typography sx={{ fontSize: "12px" }}>{data?.reason}</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
              {data?.category}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography sx={{ fontSize: "13px", color: "#000000" }}>
        {data?.timestamp}
      </Typography>
    </Box>
  );
};

type Props = {
  data: VendorActivityType[];
};
const VendorRecentActivitesTable = ({ data }: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.grey[50],
        my: 1.5,
        py: 1,
        borderRadius: "12px",
      }}
    >
      {data && data?.length > 0 ? (
        data
          ?.slice(0, 20)
          ?.map((row) => <ActivityyCard data={row} key={row?.product_id} />)
      ) : (
        <EmptyTable subText="No Recent Activities" />
      )}
    </Box>
  );
};

export default VendorRecentActivitesTable;
