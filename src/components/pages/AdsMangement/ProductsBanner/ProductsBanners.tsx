import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { bannerLinkTypes, rowsPerPageOptions, sLimit, sPage } from "src/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchBanners } from "src/services/banners";
import BannersTable from "../BannersTable";
import AddProductBannerDialog from "./AddProductBannerDialog";
import { BannerType } from "src/types/banners";
import EditProductBannerDialog from "./EditProductBannerDialog";

function ProductsBanners() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selected, setSelected] = useState<BannerType | null>(null);
  const [searchParams, _setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_PRODUCT_BANNERS,
      { limit, page },
    ],
    queryFn: () =>
      fetchBanners({ limit: limit, page: page, type: bannerLinkTypes.product }),
  });
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  const handleOpenEditDialog = (val: BannerType) => {
    setOpenEditDialog(true);
    setSelected(val);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelected(null);
  };

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openAddDialog && (
        <AddProductBannerDialog
          open={openAddDialog}
          handleClose={handleCloseAddDialog}
        />
      )}
      {openEditDialog && selected && (
        <EditProductBannerDialog
          open={openEditDialog}
          selected={selected}
          handleClose={handleCloseEditDialog}
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
        queryKey={TANSTACK_REQUEST_CACHE_TAGS.FETCH_PRODUCT_BANNERS}
        handleOpenEditDialog={handleOpenEditDialog}
      />
    </Box>
  );
}

export default ProductsBanners;
