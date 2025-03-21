import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { currencyFormater } from "src/utils";
import CubeImg from "src/assets/icons/cube_perspective_shape_icon.svg";
import BasketImg from "src/assets/icons/basket_cart_shop_shopping_store_icon.svg";
import DollarImg from "src/assets/icons/dollar_finance_financial_investment_icon.svg";
import PeopleImg from "src/assets/icons/people_fill_icon.svg";

import { BiSolidRightTopArrowCircle } from "react-icons/bi";

const itemSizing = { xs: 5, sm: 2, md: 1 };

type StatsCardProps = {
  kind: "sale" | "order" | "user" | "distributor" | "visitor";
  title: string;
  value: string | number;
  trend?: string | number;
};
const StatsCard = ({ kind, title, value, trend }: StatsCardProps) => {
  const renderImage = () => {
    if (kind === "visitor") {
      return CubeImg;
    }
    if (kind === "distributor") {
      return BasketImg;
    }
    if (kind === "order") {
      return PeopleImg;
    }
    if (kind === "user") {
      return PeopleImg;
    }
    return DollarImg;
  };
  const renderIconBackground = () => {
    if (kind === "sale") {
      return "#E4DA934D";
    }
    if (kind === "order") {
      return "#DEDFF5B2";
    }
    if (kind === "user") {
      return "#E1ECDD";
    }
    if (kind === "visitor") {
      return "#EDFAFA";
    }
    if (kind === "distributor") {
      return "#F6DED2B2";
    }
    return "#E4DA934D";
  };
  const renderBackground = () => {
    if (kind === "sale") {
      return "#EDE8C533";
    }
    if (kind === "order") {
      return "#F7F7FB";
    }
    if (kind === "user") {
      return "#F8FBF7";
    }
    if (kind === "visitor") {
      return "#F9FCFC";
    }
    if (kind === "distributor") {
      return "#F7F7FB";
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
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  color: "GrayText",
                }}
              >
                <BiSolidRightTopArrowCircle />
                <Typography sx={{ fontSize: "11.7px" }}>{trend}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
const DashboardTop = () => {
  return (
    <Box sx={{ my: 1, background: "#ffffff", p: { xs: 0.5, sm: 1 } }}>
      <Grid container spacing={1} columns={5}>
        <Grid size={itemSizing}>
          <StatsCard
            kind="sale"
            title="Total Sales"
            value={12456320}
            trend={"+2.5%"}
          />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard
            kind="order"
            title="Total Orders"
            value={12456320}
            trend={"+2.5%"}
          />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard
            kind="user"
            title="Total Users"
            value={10320}
            trend={"+2.5%"}
          />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard
            kind="distributor"
            title="Total Sales"
            value={120}
            trend={"+2.5%"}
          />
        </Grid>
        <Grid size={itemSizing}>
          <StatsCard
            kind="visitor"
            title="Total Sales"
            value={1230}
            trend={"+2.5%"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardTop;
