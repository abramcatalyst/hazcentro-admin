import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import ProductCategoryChart from "./ProductCategoryChart";
import { MdMoreVert } from "react-icons/md";
import UserImage from "src/assets/tempimages/machine1.jpg";
import FilterByBrandsSection from "./FilterByBrandsSection";
import FilterByDistributorsSection from "./FilterByDistributorsSection";
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
  },
  {
    title: "Brands",
    value: optionsObject.BRANDS,
  },
  {
    title: "Distributors",
    value: optionsObject.DISTRIBUTORS,
  },
];
const SalesBySectionWrapper = () => {
  const [selectedView, setSelectedView] = useState(optionsList[0].value);
  const theme = useTheme();
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
