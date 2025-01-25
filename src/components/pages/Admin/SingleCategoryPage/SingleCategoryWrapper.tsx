import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SingleCategoryTab from "./SingleCategoryTab";
import ProductsTable from "./ProductsTable";
import { getSelectedPageView, setSelectedPageView } from "src/utils";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import ProductsGridTable from "./ProductsGridTable";

export const pageViewTabOptionsObj = {
  GRID: "GRID",
  TABLE: "TABLE",
};
export const usersPageTabOptionsObj = {
  DETAILS: "DETAILS",
};
export const tabOptions = [
  {
    title: "Details",
    value: usersPageTabOptionsObj.DETAILS,
  },
];
export const usersViewTabOptions = [
  {
    title: "GRID",
    value: pageViewTabOptionsObj.GRID,
  },
  {
    title: "TABLE",
    value: pageViewTabOptionsObj.TABLE,
  },
];
const SingleCategoryWrapper = () => {
  const [view, setView] = useState(usersViewTabOptions[0].value);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  const handleChangeView = (val: string) => {
    setView(val);
    setSelectedPageView(val);
  };
  useEffect(() => {
    const res = getSelectedPageView();
    if (res) {
      handleChangeView(res);
    } else {
      handleChangeView(usersViewTabOptions[0].value);
    }
  }, []);

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
        <AppHeader text="Electronics" />
      </Box>
      <SingleCategoryTab
        selectedTab={selectedTab}
        view={view}
        setSelectedTab={setSelectedTab}
        selectedUsers={selectedUsers}
        handleChangeView={handleChangeView}
      />
      {view === pageViewTabOptionsObj.TABLE && (
        <ProductsTable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      )}
      {view === pageViewTabOptionsObj.GRID && <ProductsGridTable />}
    </Box>
  );
};

export default SingleCategoryWrapper;
