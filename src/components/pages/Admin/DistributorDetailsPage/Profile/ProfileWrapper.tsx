import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "src/components/pages/Admin/UserDetailsPage/UserHeader";
import ActiveOrders from "../ActiveOrders";
import ProfileDetailsSection from "./ProfileDetailsSection";
import PerformanceStats from "../PerformanceStats";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import { UserType } from "src/types/users";

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
  data: UserType;
};
const ProfileWrapper = ({ data }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <UserHeader data={data} />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <ProfileDetailsSection />
          </ErrorBoundary>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <PerformanceStats />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <ActiveOrders />
          </ErrorBoundary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileWrapper;
