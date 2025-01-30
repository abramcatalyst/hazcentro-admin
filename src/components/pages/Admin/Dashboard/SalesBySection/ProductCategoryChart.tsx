import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { label: "Electronics", value: 400 },
  { label: "Solar", value: 300 },
  { label: "Gadgets", value: 300 },
  { label: "Others", value: 200 },
];

function ProductCategoryChart() {
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <PieChart
        series={[
          {
            data,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            innerRadius: 50,
          },
        ]}
        height={220}
      />
    </Box>
  );
}
export default ProductCategoryChart;

// {
//   paddingAngle: 5,
//   innerRadius: 50,
//   outerRadius: 70,
//   data,
// },
