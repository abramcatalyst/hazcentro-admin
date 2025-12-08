import Box from "@mui/material/Box";
import { bannerLinkTypes, rowsPerPageOptions, sLimit, sPage } from "src/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchBanners } from "src/services/banners";
import BannersTable from "../BannersTable";

function BannersAdsCategory() {
  const [searchParams, _setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADS_BANNERS, { limit, page }],
    queryFn: () =>
      fetchBanners({
        limit: limit,
        page: page,
        type: bannerLinkTypes.ad_category,
      }),
  });

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <BannersTable
        data={data}
        error={error}
        isError={isError}
        isPending={isPending}
      />
    </Box>
  );
}

export default BannersAdsCategory;
