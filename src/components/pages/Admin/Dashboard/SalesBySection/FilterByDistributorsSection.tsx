import Box from "@mui/material/Box";
import { SalesByCard } from "./SalesBySectionWrapper";
const FilterByDistributorsSection = () => {
  return (
    <Box my={1}>
      {[1, 2, 3, 4].map((item, idx) => (
        <SalesByCard
          num={idx}
          key={`${item}nbvb`}
          title="Oriano"
          subTitle="User ID: 1497HYT"
        />
      ))}
    </Box>
  );
};

export default FilterByDistributorsSection;
