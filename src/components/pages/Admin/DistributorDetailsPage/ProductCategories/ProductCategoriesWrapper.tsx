import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "src/components/pages/Admin/UserDetailsPage/UserHeader";
import ActiveOrders from "../ActiveOrders";
import PerformanceStats from "../PerformanceStats";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import { UserType } from "src/types/users";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import {
  fetchVendorCategoriesAndActivityData,
  fetchVendorOverviewData,
} from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import VendorsCategoriesTable from "./VendorCategoriesTable";
import VendorRecentActivitesTable from "./VendorRecentActivitesTable";

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
type Props = {
  userData: UserType;
};
const ProductCategoriesWrapper = ({ userData }: Props) => {
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_OVERVIEW,
      { id },
    ],
    queryFn: () => fetchVendorOverviewData({ id: id }),
  });

  const {
    error: errorCatAndActivies,
    data: dataCatAndActivies,
    isError: isErrorCatAndActivies,
    isPending: isPendingCatAndActivies,
  } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_CATEGORIES_AND_ACTIVITIES,
      { id },
    ],
    queryFn: () => fetchVendorCategoriesAndActivityData({ id: id }),
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
        <Grid size={{ xs: 12, md: 8 }}>
          <>
            {isPendingCatAndActivies ? (
              <HalfScreenLoader />
            ) : isErrorCatAndActivies ? (
              <HalfScreenError text={formatErrorMessage(errorCatAndActivies)} />
            ) : (
              <>
                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                  <UserHeader data={userData} vendorOverviewData={data} />
                </ErrorBoundary>
                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                  <VendorsCategoriesTable
                    data={dataCatAndActivies?.categories}
                  />
                </ErrorBoundary>
                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                  <VendorRecentActivitesTable
                    data={dataCatAndActivies?.recent_activities}
                  />
                </ErrorBoundary>
              </>
            )}
          </>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <>
            {isPending ? (
              <HalfScreenLoader />
            ) : isError ? (
              <HalfScreenError text={formatErrorMessage(error)} />
            ) : (
              <>
                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                  <PerformanceStats />
                </ErrorBoundary>
                <ErrorBoundary FallbackComponent={ErrorFallBack}>
                  <ActiveOrders data={data} />
                </ErrorBoundary>
              </>
            )}
          </>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductCategoriesWrapper;
