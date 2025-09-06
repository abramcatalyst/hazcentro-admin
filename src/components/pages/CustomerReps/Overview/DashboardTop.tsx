import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { currencyFormater, formatErrorMessage } from "src/utils";
import DisputeImg from "src/assets/icons/fluent_scales-32-filled.svg";
import BasketImg from "src/assets/icons/basket_cart_shop_shopping_store_icon.svg";
import CheckedImg from "src/assets/icons/pepicons-pop_checkmark-filled.svg";
import ResolutionImg from "src/assets/icons/bi_hourglass-split.svg";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchAgentDashboardOverview } from "src/services/agents";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { SxProps } from "@mui/material";

const itemSizing = { xs: 6, sm: 4, md: 3 };

type StatsCardProps = {
  kind: "dispute" | "order" | "resolution" | "today";
  title: string;
  value: string | number;
  trend?: string | number;
};
const StatsCard = ({ kind, title, value }: StatsCardProps) => {
  const renderImage = () => {
    if (kind === "dispute") {
      return DisputeImg;
    }
    if (kind === "order") {
      return BasketImg;
    }
    if (kind === "resolution") {
      return ResolutionImg;
    }

    return CheckedImg;
  };
  const renderIconBackground = () => {
    if (kind === "dispute") {
      return "#E4DA934D";
    }
    if (kind === "order") {
      return "#F6DED2B2";
    }

    if (kind === "resolution") {
      return "#DEDFF5B2";
    }
    if (kind === "today") {
      return "#EDFAFA";
    }
    return "#E4DA934D";
  };
  const renderBackground = () => {
    if (kind === "dispute") {
      return "#EDE8C533";
    }
    if (kind === "order") {
      return "#FBF7F5";
    }
    if (kind === "resolution") {
      return "#F7F7FB";
    }
    if (kind === "today") {
      return "#F9FCFC";
    }

    return "#E4DA934D";
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
const DashboardTop = () => {
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_CUSTOMER_CARE_OVERVIEW, {}],
    queryFn: () => fetchAgentDashboardOverview(),
  });

  const skelentonStyle: SxProps = { height: "100px" };
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return (
      <Box sx={{ my: 1, background: "#ffffff", p: { xs: 0.5, sm: 1 } }}>
        <Grid container spacing={1}>
          <Grid size={itemSizing}>
            <Skeleton sx={skelentonStyle} />
          </Grid>
          <Grid size={itemSizing}>
            <Skeleton sx={skelentonStyle} />
          </Grid>
          <Grid size={itemSizing}>
            <Skeleton sx={skelentonStyle} />
          </Grid>

          <Grid size={itemSizing}>
            <Skeleton sx={skelentonStyle} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 1, background: "#ffffff", p: { xs: 0.5, sm: 1 } }}>
      <Grid container spacing={1}>
        <Grid size={itemSizing}>
          <StatsCard
            kind="order"
            title="Orders Needing Attention"
            value={data?.orders_needing_attention}
            trend={"+2.5%"}
          />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard
            kind="dispute"
            title="Total Open Disputes"
            value={data?.total_open_disputes}
            trend={"+2.5%"}
          />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard
            kind="resolution"
            title="Average Resolution Time"
            value={data?.avg_resolution_time_days}
            trend={"+2.5%"}
          />
        </Grid>

        <Grid size={itemSizing}>
          <StatsCard
            kind="today"
            title="Resolved Disputes Today"
            value={data?.dispute_resolved_today}
            trend={"+2.5%"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardTop;
