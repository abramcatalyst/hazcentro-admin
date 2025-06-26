import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchVendorEscrowData } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import BalanceSection from "./BalanceSection";
import RecentPayoutTable from "./RecentPayoutTable";
import OrdersWrapper from "./Orders/OrdersWrapper";

export const tabOptionsObj = {
  PROFILE: "PROFILE",
  PRODUCTS: "PRODUCTS",
  DOCUMENTS: "DOCUMENTS",
  PAYMENT: "PAYMENT",
};
export const profileTabOptions = [
  {
    title: "Profile",
    value: tabOptionsObj.PROFILE,
  },
  {
    title: "Products",
    value: tabOptionsObj.PRODUCTS,
  },
  {
    title: "Documents ",
    value: tabOptionsObj.DOCUMENTS,
  },
  {
    title: "Payment",
    value: tabOptionsObj.PAYMENT,
  },
];

const EscrowWrapper = () => {
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_ESCROW_DATA,
      { id },
    ],
    queryFn: () => fetchVendorEscrowData({ id: id }),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 8 }}>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Box
              sx={{
                width: "100%",
                background: "#ffffff",
                borderRadius: "24px",
                py: { xs: 1, sm: 3 },
                px: { xs: 1, sm: 2 },
              }}
            >
              <BalanceSection data={data} />
              <OrdersWrapper data={data} />
            </Box>
          </ErrorBoundary>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <RecentPayoutTable data={data} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EscrowWrapper;
