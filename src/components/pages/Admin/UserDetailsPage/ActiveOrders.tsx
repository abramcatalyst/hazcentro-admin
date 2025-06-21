import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MachineImg from "src/assets/images/placeholder.png";
import { currencyFormater, formatErrorMessage } from "src/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchSingleUsersOrders } from "src/services/orders";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import OrderSkeletonLoader from "src/components/shared/OrderSkeletonLoader/OrderSkeletonLoader";

type ProductInfoBoxProps = {
  image: string;
  title: string;
  caption1: string;
  caption2?: string;
  direction?: "row" | "column";
};
const ProductInfoBox = ({
  image,
  title,
  caption1,
  caption2,
  direction = "row",
}: ProductInfoBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: direction,
        gap: direction === "column" ? "2px" : 1,
        alignItems: direction === "column" ? "flex-start" : "center",
      }}
    >
      <Box>
        <img
          src={image}
          alt="product"
          style={{
            width: direction === "column" ? "46px" : "72px",
            height: direction === "column" ? "46px" : "72px",
            objectFit: "cover",
            borderRadius: "6px",
            marginTop: "2px",
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "15px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "13px",
          }}
        >
          &#8358;{currencyFormater(caption1)}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "13px",
          }}
        >
          {caption2}
        </Typography>
      </Box>
    </Box>
  );
};

const ActiveOrders = () => {
  const { id } = useParams();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER_ACTIVE_ORDERS,
      { id },
    ],
    queryFn: () => fetchSingleUsersOrders({ id: id || "", limit: 3 }),
  });

  if (isPending) {
    return (
      <Box>
        <OrderSkeletonLoader />
        <OrderSkeletonLoader />
        <OrderSkeletonLoader />
      </Box>
    );
  }
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
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
      {data?.data && data?.data?.length > 0 ? (
        data?.data?.map((row) => (
          <Box
            key={`${row?.id}aa`}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ProductInfoBox
              image={
                row?.order_items[0]?.product?.media[0]?.original_url ||
                MachineImg
              }
              title={row?.order_items[0]?.product?.name}
              caption1={row?.total_price}
            />
            <Button size="small" color="success" sx={{ color: "#47B48E" }}>
              View details
            </Button>
          </Box>
        ))
      ) : (
        <EmptyTable isSmall subText="Sorry, no record match your search" />
      )}
    </Box>
  );
};

export default ActiveOrders;
