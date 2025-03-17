import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GLOBAL_COLORS } from "src/utils";
import { Link } from "react-router-dom";
import OrderItemCard from "src/components/shared/OrderItemCard/OrderItemCard";

function ActiveOrders() {
  let testOrders = ["2"];
  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom>Active Orders</Typography>
        <Link
          to="#"
          style={{ color: GLOBAL_COLORS.GREEN_MAIN, fontSize: "13px" }}
        >
          View All
        </Link>
      </Box>
      <Box
        sx={{
          my: 1,
        }}
      >
        {testOrders.length > 0 ? (
          testOrders.map((order) => <OrderItemCard key={order} />)
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "140px",
              background: "#ffffff",
              p: 1,
              borderRadius: "12px",
              my: 0.6,
            }}
          >
            <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
              No active order
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default ActiveOrders;
