import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { currencyFormater } from "src/utils";
import { SalesInsightBrandType } from "src/types/admin";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { cardColors, renderRank, SalesByCard } from "./SalesBySectionWrapper";

type Props = {
  data: SalesInsightBrandType[];
};

const FilterByBrandsSection = ({ data }: Props) => {
  return (
    <Box my={1}>
      {data?.length > 0 ? (
        data.map((item, idx) => (
          <SalesByCard
            num={idx}
            key={item.id}
            title={item.name}
            subTitle={`Revenue: ₦${currencyFormater(item.total_revenue, 2)}`}
          />
        ))
      ) : (
        <EmptyTable subText="No brand sales data yet" />
      )}
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
          <Box
            key={item}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <Box
              sx={{
                background: item,
                height: "12px",
                width: "12px",
                borderRadius: "2px",
              }}
            />
            <Typography>{renderRank(idx)}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilterByBrandsSection;
