import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { VendorOverviewType } from "src/types/vendor";
import VendorOrderItemCard from "src/components/shared/OrderItemCard/VendorOrderItemCard";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type Props = {
  data: VendorOverviewType;
};
const ActiveOrders = ({ data }: Props) => {
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
          Active Orders
        </Typography>
      </Box>
      {data && data?.active_orders?.length > 0 ? (
        data?.active_orders
          ?.slice(0, 4)
          ?.map((row, idx) => (
            <VendorOrderItemCard data={row} key={`${row?.id}${idx}`} />
          ))
      ) : (
        <EmptyTable subText="No Active Orders" />
      )}
    </Box>
  );
};

export default ActiveOrders;
