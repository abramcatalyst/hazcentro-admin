import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";

import AddProductsToAdsCategoryTable from "./AddProductsToAdsCategoryTable";

const AddProductsToAdsCategoryWrapper = () => {
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
        <AppHeader text="Add Products to Category" />
      </Box>

      <Box my={1}>
        <AddProductsToAdsCategoryTable />
      </Box>
    </Box>
  );
};

export default AddProductsToAdsCategoryWrapper;
