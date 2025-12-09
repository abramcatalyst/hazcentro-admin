import { useEffect } from "react";
import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchSingleAdsCategoryProducts } from "src/services/banners";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
} from "src/utils";
import AdsProductsTable from "./AdsProductsTable";

const AdsCategoryDetailsProductsWrapper = () => {
  const { id } = useParams();
  const [searchParams, _setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;
  const queryClient = useQueryClient();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ADS_CATEGORY_PRODUCTS,
      { id, limit, page },
    ],
    queryFn: () => fetchSingleAdsCategoryProducts(id || ""),
  });
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: [
          TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ADS_CATEGORY_PRODUCTS,
        ],
      });
    };
  }, []);

  if (isPending) {
    return <HalfScreenLoader />;
  }
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <AppHeader text="Ads Category Products" />
      </Box>

      <Box my={1}>
        <AdsProductsTable data={data} />
      </Box>
    </Box>
  );
};

export default AdsCategoryDetailsProductsWrapper;
