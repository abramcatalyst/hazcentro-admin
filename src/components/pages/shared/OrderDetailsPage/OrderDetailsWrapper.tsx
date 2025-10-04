import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import TopSection from "./TopSection";
// import ProductInformation from "./ProductInformation";
// import PaymentInformationSection from "./PaymentInformationSection";
// import OrderStages from "./OrderStages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { formatErrorMessage } from "src/utils";
import { fetchSingleOrder } from "src/services/orders";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import TopSection from "src/components/pages/Admin/OrderManagement/OrderPreviewDialog/TopSection";
import ProductInformation from "src/components/pages/Admin/OrderManagement/OrderPreviewDialog/ProductInformation";
import PaymentInformationSection from "src/components/pages/Admin/OrderManagement/OrderPreviewDialog/PaymentInformationSection";
import OrderStages from "src/components/pages/Admin/OrderManagement/OrderPreviewDialog/OrderStages";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import AppHeader from "src/components/shared/AppHeader/AppHeader";

function OrderDetailsWrapper() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { error, data, isError, refetch, isLoading } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ORDER, { id }],
    queryFn: () => fetchSingleOrder(id || ""),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ORDER],
      });
    };
  }, []);

  if (isLoading) {
    return <HalfScreenLoader />;
  }
  if (isError) {
    return (
      <Box>
        <HalfScreenError text={formatErrorMessage(error)} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        sx={{
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          No data avaialble
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <MetaDecorator title=" Order details" />
      <AppHeader text="Order Details" />

      <TopSection selectedOrder={data} />
      <Box>
        <Grid container spacing={1} columns={6}>
          <Grid size={{ xs: 6, sm: 4 }}>
            <ProductInformation selectedOrder={data} />
          </Grid>
          <Grid size={{ xs: 6, sm: 2 }}>
            <PaymentInformationSection selectedOrder={data} />
          </Grid>
        </Grid>
        <OrderStages selectedOrder={data} refetch={refetch} />
      </Box>
    </Box>
  );
}
export default OrderDetailsWrapper;
