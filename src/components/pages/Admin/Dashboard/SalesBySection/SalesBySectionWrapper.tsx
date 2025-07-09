import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import ProductCategoryChart from "./ProductCategoryChart";
import { MdMoreVert } from "react-icons/md";
import UserImage from "src/assets/tempimages/machine1.jpg";
import FilterByBrandsSection from "./FilterByBrandsSection";
import FilterByDistributorsSection from "./FilterByDistributorsSection";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchAdminDashboardSalesInsights } from "src/services/admins";
import { formatErrorMessage } from "src/utils";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
type SalesByCardProps = {
  title: string;
  subTitle: string;
  num: number;
};
export const cardColors = ["#4747E9", "#ED8E60", "#41CD9C", "#CCE64C"];
export const renderRank = (rank: number) => {
  if (rank === 0) {
    return "First";
  }
  if (rank === 0) {
    return "Second";
  }
  if (rank === 0) {
    return "Third";
  }
  if (rank === 0) {
    return "Fourth";
  }
  return "Others";
};
export const SalesByCard = ({ title, subTitle, num }: SalesByCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: `3px solid ${cardColors[num]}`,
        py: 0.6,
        mb: 0.5,
        pl: 0.8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          my: 0.4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderRadius: "6px",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={UserImage}
              alt="trans"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "GrayText",
              }}
            >
              {subTitle}
            </Typography>
          </Box>
        </Box>
        <MdMoreVert />
      </Box>
    </Box>
  );
};

const optionsObject = {
  PRODUCT_CAT: "PRODUCT_CAT",
  BRANDS: "BRANDS",
  DISTRIBUTORS: "DISTRIBUTORS",
};
const optionsList = [
  {
    title: "Product Cat.",
    value: optionsObject.PRODUCT_CAT,
    type: "product",
  },
  {
    title: "Brands",
    value: optionsObject.BRANDS,
    type: "brand",
  },
  {
    title: "Distributors",
    value: optionsObject.DISTRIBUTORS,
    type: "vendor",
  },
];
const SalesBySectionWrapper = () => {
  const [selectedView, setSelectedView] = useState(optionsList[0].value);
  const [queryFilter, setQueryFilter] = useState(optionsList[0].type);
  const theme = useTheme();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_DASHBOARD_SALES_INSIGHTS,
      { queryFilter },
    ],
    queryFn: () => fetchAdminDashboardSalesInsights({ type: queryFilter }),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  console.log("ddddddddddddddd", data);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        p: 1,
        borderRadius: "16px",
        mb: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
          Sales By
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.2,
          }}
        >
          {optionsList.map((item) => (
            <Box
              key={item.value}
              sx={{
                background:
                  selectedView === item.value
                    ? "#FFCC16"
                    : theme.palette.grey[100],
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 500,
                py: 1,
                px: 1.5,
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedView(item.value);
                setQueryFilter(item?.type);
              }}
            >
              {item?.title}{" "}
            </Box>
          ))}
        </Box>
      </Box>
      {selectedView === optionsObject.PRODUCT_CAT && <ProductCategoryChart />}
      {selectedView === optionsObject.BRANDS && <FilterByBrandsSection />}
      {selectedView === optionsObject.DISTRIBUTORS && (
        <FilterByDistributorsSection />
      )}
    </Box>
  );
};

export default SalesBySectionWrapper;
