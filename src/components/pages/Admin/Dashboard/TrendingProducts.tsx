import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { currencyFormater, formatErrorMessage } from "src/utils";
import DefaultImage from "src/assets/images/placeholder.png";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchAdminDashboardTrendingProducts } from "src/services/admins";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import OrderSkeletonLoader from "src/components/shared/OrderSkeletonLoader/OrderSkeletonLoader";
import { TrendingProductType } from "src/types/products";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type TrendingProductCardProps = {
  data: TrendingProductType;
};
const TrendingProductCard = ({ data }: TrendingProductCardProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 0.8,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "70px",
            height: "79px",
          }}
        >
          <img
            src={data?.image_url || DefaultImage}
            alt="total sales"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </Box>
        <Box>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              color: "#312F27B2",
              fontSize: { xs: "14px", sm: "17px" },
            }}
          >
            {data?.name}
          </Typography>
          <Typography fontSize="14px" color="#312F27B2">
            SKU:{data?.sku}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: { xs: "14px", sm: "17px" },
            color: "#312F27B2",
          }}
        >
          &#8358;{currencyFormater(data?.total_revenue_generated, 2)}
        </Typography>
      </Box>
    </Box>
  );
};
const TrendingProducts = () => {
  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_DASHBOARD_TRENDING_PRODUCTS,
    ],
    queryFn: () => fetchAdminDashboardTrendingProducts(),
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
      sx={{
        width: "100%",
        background: "#ffffff",
        p: { xs: 0.5, sm: 1 },
        borderRadius: "12px",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        Trending Products
      </Typography>
      {data && data?.length > 0 ? (
        data
          ?.slice(0, 12)
          ?.map((row) => <TrendingProductCard data={row} key={row?.id} />)
      ) : (
        <EmptyTable isSmall subText="No trending products" />
      )}
    </Box>
  );
};

export default TrendingProducts;
