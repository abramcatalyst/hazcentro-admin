import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { bannerLinkTypes, rowsPerPageOptions, sLimit, sPage } from "src/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchBanners } from "src/services/banners";
import BannersTable from "../BannersTable";
import AddExternalBannerDialog from "./AddExternalBannerDialog";

function ExternalBanners() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchParams, _setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_EXTERNAL_BANNERS,
      { limit, page },
    ],
    queryFn: () =>
      fetchBanners({
        limit: limit,
        page: page,
        type: bannerLinkTypes.external,
      }),
  });
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openAddDialog && (
        <AddExternalBannerDialog
          open={openAddDialog}
          handleClose={handleCloseAddDialog}
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleOpenAddDialog();
          }}
        >
          Add Banner
        </Button>
      </Box>
      <BannersTable
        data={data}
        error={error}
        isError={isError}
        isPending={isPending}
        queryKey={TANSTACK_REQUEST_CACHE_TAGS.FETCH_EXTERNAL_BANNERS}
      />
    </Box>
  );
}

export default ExternalBanners;
