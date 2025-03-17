import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { currencyFormater } from "src/utils";
import Package from "src/assets/icons/vaadin_package.svg";
import CheckedImg from "src/assets/icons/fluent_box-checkmark-20-filled.svg";
import DeliveryTruck from "src/assets/icons/mage_delivery-truck-fill.svg";
import DisputeImg from "src/assets/icons/fluent_warning-32-filled.svg";

const itemSizing = { xs: 6, sm: 6 };

type StatsCardProps = {
  kind:
    | "total"
    | "dispute"
    | "pending"
    | "processing"
    | "cancelled"
    | "delivered";
  title: string;
  value: string | number;
};
const StatsCard = ({ kind, title, value }: StatsCardProps) => {
  const renderImage = () => {
    if (kind === "dispute") {
      return DisputeImg;
    }
    if (kind === "total") {
      return Package;
    }
    if (kind === "pending") {
      return CheckedImg;
    }
    if (kind === "delivered") {
      return CheckedImg;
    }
    if (kind === "processing") {
      return DeliveryTruck;
    }

    return CheckedImg;
  };
  const renderIconBackground = () => {
    if (kind === "total") {
      return "#E4DA934D";
    }

    if (kind === "processing" || kind === "cancelled") {
      return "#DEDFF5B2";
    }

    if (kind === "delivered" || kind === "pending") {
      return "#EDFAFA";
    }
    return "#E4DA934D";
  };
  const renderBackground = () => {
    if (kind === "dispute") {
      return "#FBF7F5";
    }
    if (kind === "total") {
      return "#EDE8C533";
    }
    if (kind === "processing" || kind === "cancelled") {
      return "#F7F7FB";
    }

    return "#F9FCFC";
  };
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "12px",
        background: renderBackground(),
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box
            sx={{
              width: "46px",
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: renderIconBackground(),
            }}
          >
            <img
              src={renderImage()}
              alt={title}
              style={{ width: "21px", height: "21px", objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 600, fontSize: { xs: "14px", sm: "22px" } }}
            >
              {currencyFormater(value)}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography sx={{ fontSize: "11.7px" }}>{title}</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
const DistributorsStats = () => {
  return (
    <Box
      sx={{
        my: 1,
        background: "#ffffff",
        p: { xs: 0.5, sm: 1 },
        borderRadius: "24px",
      }}
    >
      <Grid container spacing={1}>
        <Grid size={itemSizing}>
          <StatsCard kind="total" title="Total Orders" value={124520} />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard kind="pending" title="Pending Orders" value={320} />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard kind="processing" title="Order Processing" value={120} />
        </Grid>

        <Grid size={itemSizing}>
          <StatsCard kind="cancelled" title="Order Cancelled" value={120} />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard kind="delivered" title="Orders Delivered" value={120} />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard kind="dispute" title="Orders in Dispute" value={10} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DistributorsStats;
