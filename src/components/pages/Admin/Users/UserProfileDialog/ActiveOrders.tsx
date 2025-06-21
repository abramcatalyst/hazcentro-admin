import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatErrorMessage, GLOBAL_COLORS } from "src/utils";
import { Link } from "react-router-dom";
import OrderItemCard from "src/components/shared/OrderItemCard/OrderItemCard";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchSingleUsersOrders } from "src/services/orders";
import OrderSkeletonLoader from "src/components/shared/OrderSkeletonLoader/OrderSkeletonLoader";
import { UserType } from "src/types/users";

type Props = {
  selectedUser: UserType;
};
function ActiveOrders({ selectedUser }: Props) {
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER_ACTIVE_ORDERS,
      { selectedUser },
    ],
    queryFn: () =>
      fetchSingleUsersOrders({ id: selectedUser?.id || "", limit: 2 }),
  });

  if (isPending) {
    return (
      <Box>
        <OrderSkeletonLoader />
        <OrderSkeletonLoader />
      </Box>
    );
  }
  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography sx={{ textAlign: "center", color: "burlywood" }}>
          {formatErrorMessage(error)}
        </Typography>
      </Box>
    );
  }
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
        {data && data?.data?.length > 0 ? (
          data?.data?.map((row) => <OrderItemCard key={row?.id} data={row} />)
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
