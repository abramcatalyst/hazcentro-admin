import { useState } from "react";
import Box from "@mui/material/Box";
import UsersTab from "./AdsMangementTab";
import ProductsBanners from "./ProductsBanner/ProductsBanners";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import BannersAdsCategory from "./BannersAdsCategory/BannersAdsCategory";
import ExternalBanners from "./ExternalBanners/ExternalBanners";

export const usersPageTabOptionsObj = {
  products_banner: "products_banner",
  ads_banner: "ads_banner",
  external_banner: "external_banner",
};
export const tabOptions = [
  {
    title: "Products Banner",
    value: usersPageTabOptionsObj.products_banner,
  },
  {
    title: "Ads Banner",
    value: usersPageTabOptionsObj.ads_banner,
  },
  {
    title: "External Banner",
    value: usersPageTabOptionsObj.external_banner,
  },
];

const AdsMangementWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
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
        <AppHeader text="Ads Management" />
      </Box>
      <UsersTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === usersPageTabOptionsObj.products_banner && (
        <ProductsBanners />
      )}
      {selectedTab === usersPageTabOptionsObj.ads_banner && (
        <BannersAdsCategory />
      )}
      {selectedTab === usersPageTabOptionsObj.external_banner && (
        <ExternalBanners />
      )}
    </Box>
  );
};

export default AdsMangementWrapper;
