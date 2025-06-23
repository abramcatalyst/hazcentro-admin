import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";
import MedalImg from "src/assets/images/star-medal.png";
import Star1Img from "src/assets/images/star-ticket.png";
import Star2Img from "src/assets/images/star-ticket-2.png";
import { StatsBox } from "../../Users/DistributorProfileDialog/DistributorStats";
import { VendorOverviewType } from "src/types/vendor";

type Props = {
  vendorOverviewData: VendorOverviewType;
};
function DistributorStats({ vendorOverviewData }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        my: 1,
        background: alpha(theme.palette.error.light, 0.05),
        py: 0.5,
        px: 1,
        borderRadius: "20px",
        minHeight: "120px",
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <StatsBox
        title="Total Products"
        value={vendorOverviewData?.summary?.total_products}
        image={Star1Img}
      />

      <StatsBox
        title="Successful Sales"
        value={vendorOverviewData?.summary?.successful_sales}
        image={Star2Img}
      />

      <StatsBox
        title="Years Selling"
        value={Math.abs(vendorOverviewData?.summary?.years_selling || 0)}
        image={MedalImg}
      />
    </Box>
  );
}
export default DistributorStats;
