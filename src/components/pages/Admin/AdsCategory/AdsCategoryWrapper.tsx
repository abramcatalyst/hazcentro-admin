import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { GLOBAL_COLORS } from "src/utils";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import AdsCategoryTable from "./AdsCategoryTable";
import AddAdsCategoryDialog from "./AddAdsCategoryDialog";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

const AdsCategoryWrapper = () => {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  const handleCloseAddAgentDialog = () => {
    setOpenAddCategoryDialog(false);
  };
  const handleOpenAddCategoryDialog = () => {
    setOpenAddCategoryDialog(true);
  };
  return (
    <Box>
      {openAddCategoryDialog && (
        <AddAdsCategoryDialog
          open={openAddCategoryDialog}
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
        <AppHeader text="Ads Category" />
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
              handleOpenAddCategoryDialog();
            }}
          >
            Add Category
          </Button>
        </Box>
      </Box>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AdsCategoryTable />
      </ErrorBoundary>
    </Box>
  );
};

export default AdsCategoryWrapper;
