import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceholderImage from "src/assets/images/placeholder.png";
import { alpha, useTheme } from "@mui/material/styles";
import { OrderType } from "src/types/orders";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE_LINKS, CUSTOMER_ROUTE_LINKS } from "src/utils/routeLinks";
import useAuthStore from "src/store/authStore";

type Props = {
  data: OrderType;
};
function OrderItemCard({ data }: Props) {
  const theme = useTheme();
  const { profile } = useAuthStore((state) => state);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid ${theme.palette.grey[200]}`,
        background: "#ffffff",
        p: { xs: 1 },
        borderRadius: "12px",
        my: 0.6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            borderRadius: "6px",
            height: "72px",
            width: "72px",
          }}
        >
          <img
            src={
              data?.order_items[0]?.product?.media[0]?.original_url ??
              PlaceholderImage
            }
            alt={"Item"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "15px" }}>
            {data?.order_items[0]?.product?.name}
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "GrayText" }}>
            SKU:{data?.order_items[0]?.product?.sku || ""}
          </Typography>
        </Box>
      </Box>
      <Link
        to={
          profile?.role === "admin"
            ? `${ADMIN_ROUTE_LINKS.ADMIN_ORDER_DETAILS}/${data?.id}`
            : `${CUSTOMER_ROUTE_LINKS.CUSTOMER_ORDER_DETAILS}/${data?.id}`
        }
      >
        <Button
          color="error"
          sx={{
            background: alpha(theme.palette.error.light, 0.05),
            color: "#000000",
            "&:hover": {
              background: alpha(theme.palette.error.light, 0.7),
              color: "#ffffff",
            },
          }}
        >
          View details
        </Button>
      </Link>
    </Box>
  );
}
export default OrderItemCard;
