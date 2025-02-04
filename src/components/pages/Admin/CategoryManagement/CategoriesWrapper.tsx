import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  formatErrorMessage,
  GLOBAL_COLORS,
  rowsPerPageOptions,
  sLimit,
  sPage,
} from "src/utils";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import CategoriesTab from "./CategoriesTab";
import CategoriesTable from "./CategoriesTable";
import AddCategoryDialog from "./AddCategoryDialog";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchCategories } from "src/services/categories";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { useSearchParams } from "react-router-dom";

const CategoriesWrapper = () => {
  const [openAddAgentDialog, setOpenAddAgentDialog] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_CATEGORIES, { limit, page }],
    queryFn: () => fetchCategories({ limit: limit, page }),
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams(
      (params) => {
        params.set(sPage, `${newPage + 1}`);
        return params;
      },
      { replace: true }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "1");
        return params;
      },
      { replace: true }
    );
  };

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }

  const handleCloseAddAgentDialog = () => {
    setOpenAddAgentDialog(false);
  };
  const handleOpenAddAgentDialog = () => {
    setOpenAddAgentDialog(true);
  };
  console.log("dddddddddd", handleChangePage, handleChangeRowsPerPage);
  return (
    <Box>
      {openAddAgentDialog && (
        <AddCategoryDialog
          open={openAddAgentDialog}
          handleClose={handleCloseAddAgentDialog}
        />
      )}
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
        <AppHeader text="Category Management" />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            sx={{
              borderRadius: "12px",
              MozOutlineRadius: "12px",
              border: `2px solid ${GLOBAL_COLORS.SECONDARY_MAIN}`,
            }}
            onClick={() => {
              handleOpenAddAgentDialog();
            }}
          >
            Add Category
          </Button>
          <Button
            size="large"
            color="inherit"
            sx={{
              borderRadius: "12px",
              MozOutlineRadius: "12px",
              background: `${GLOBAL_COLORS.GREY_50}`,
              px: 2,
            }}
          >
            Manage
          </Button>
          {/* {usersViewTabOptions.map((item) => (
            <Box
              sx={{
                height: "42px",
                minWidth: "88px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                background:
                  item.value === view ? "#47B48E0D" : GLOBAL_COLORS.GREY_10,
                color: item.value === view ? "#47B48E" : "GrayText",
                borderRadius: "12px",
                border: item.value === view ? `2px solid #47B48E` : "none",
                cursor: "pointer",
              }}
              key={item.title}
              onClick={() => {
                setView(item.value);
              }}
            >
              <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                Add Agent
              </Typography>
            </Box>
          ))} */}
        </Box>
      </Box>
      <CategoriesTab />
      <CategoriesTable data={data?.data} />
    </Box>
  );
};

export default CategoriesWrapper;
