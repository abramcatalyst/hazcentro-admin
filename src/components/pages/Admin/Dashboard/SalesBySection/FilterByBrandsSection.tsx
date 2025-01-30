import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { cardColors, renderRank, SalesByCard } from "./SalesBySectionWrapper";
const FilterByBrandsSection = () => {
  return (
    <Box my={1}>
      {[1, 2, 3, 4].map((item, idx) => (
        <SalesByCard
          num={idx}
          key={`${item}nb`}
          title="Oriano"
          subTitle="User ID: 1497HYT"
        />
      ))}
      <Box
        sx={{
          my: 1,
          display: "flex",
          gap: 1.7,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ color: "GrayText", fontSize: "14px" }}>
          Ranks:
        </Typography>
        {cardColors.map((item, idx) => (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {" "}
            <Box
              sx={{
                background: item,
                height: "12px",
                width: "12px",
                borderRadius: "2px",
              }}
            />{" "}
            <Typography>{renderRank(idx)}</Typography>{" "}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilterByBrandsSection;
