import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SideNav from "./SideNav";
import OverviewWrapper from "./Overview/OverviewWrapper";
import ProfileWrapper from "./Profile/ProfileWrapper";
import OrdersWrapper from "./Orders/OrdersWrapper";
import SubscriptionWrapper from "./Subscriptions/SubscriptionWrapper";
import { UserDetailsPageProps } from "src/pages/admin/AdminUserDetailsPage";
import ProductCategoriesWrapper from "./ProductCategories/ProductCategoriesWrapper";
import RateAndReviewsWrapper from "./RateAndReviews/RateAndReviewsWrapper";
import FeedAndFollowersWrapper from "./FeedsAndFollowers/FeedAndFollowersWrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

export const usersPageTabOptionsObj = {
  OVERVIEW: "OVERVIEW",
  PROFILE: "PROFILE",
  PRODUCT_CATEGORY: "PRODUCT_CATEGORY",
  SUBSCRIPTION: "SUBSCRIPTION",
  ESCROW: "ESCROW",
  MESSAGE: "MESSAGE",
  RATE_AND_REVIEWS: "RATE_AND_REVIEWS",
  FEEDS_AND_FOLLOWERS: "FEEDS_AND_FOLLOWERS",
  VOUCHER_AND_COUPON: "VOUCHER_AND_COUPON",
  ORDERS: "ORDERS",
  FOLLOWINGS: "FOLLOWINGS",
  DISPUTE_LOG: "DISPUTE_LOG",
};
export const profileTabOptions = [
  {
    title: "Overview",
    value: usersPageTabOptionsObj.OVERVIEW,
  },
  {
    title: "Profile",
    value: usersPageTabOptionsObj.PROFILE,
  },
  {
    title: "Product Category",
    value: usersPageTabOptionsObj.PRODUCT_CATEGORY,
  },
  {
    title: "Subscriptions",
    value: usersPageTabOptionsObj.SUBSCRIPTION,
  },
  {
    title: "Escrow",
    value: usersPageTabOptionsObj.ESCROW,
  },
  {
    title: "Message",
    value: usersPageTabOptionsObj.MESSAGE,
  },
  {
    title: "Rate & Reviews",
    value: usersPageTabOptionsObj.RATE_AND_REVIEWS,
  },
  {
    title: "Feeds & Followers",
    value: usersPageTabOptionsObj.FEEDS_AND_FOLLOWERS,
  },
  {
    title: "Voucher & Coupon",
    value: usersPageTabOptionsObj.VOUCHER_AND_COUPON,
  },
];

const DistributorDetailsPageWrapper = ({ data }: UserDetailsPageProps) => {
  const [selectedTab, setSelectedTab] = useState(profileTabOptions[0].value);
  return (
    <Box>
      <Box>
        <Grid container spacing={1} columns={15}>
          <Grid size={{ xs: false, sm: 2 }}>
            <SideNav
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </Grid>
          <Grid size={{ xs: 15, sm: 13 }} container spacing={1}>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.OVERVIEW ? (
                <OverviewWrapper userData={data} />
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.PROFILE ? (
                <ProfileWrapper userData={data} />
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.PRODUCT_CATEGORY ? (
                <ProductCategoriesWrapper userData={data} />
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.FEEDS_AND_FOLLOWERS ? (
                <FeedAndFollowersWrapper />
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.ORDERS ? (
                <OrdersWrapper />
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.SUBSCRIPTION ? (
                <SubscriptionWrapper />
              ) : null}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              {selectedTab === usersPageTabOptionsObj.RATE_AND_REVIEWS ? (
                <RateAndReviewsWrapper />
              ) : null}
            </ErrorBoundary>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DistributorDetailsPageWrapper;
