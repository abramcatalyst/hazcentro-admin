import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { currencyFormater, valueFormatter } from "src/utils";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";

export const dataset = [
  {
    sale: 2100000,
    day: "Sun",
  },
  {
    sale: 280000,
    day: "Mon",
  },
  {
    sale: 410000,
    day: "Tue",
  },
  {
    sale: 730000,
    day: "Wed",
  },
  {
    sale: 990000,
    day: "Thu",
  },
  {
    sale: 1440000,
    day: "Fri",
  },
  {
    sale: 3190500,
    day: "Sat",
  },
];

function PerformanceStats() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 1.5 },
        background: "#ffffff",
        borderRadius: "24px",
        mb: 1.5,
      }}
    >
      <Box sx={{ mb: 1.5 }}>
        <ProfileTitle text="Performance" />
      </Box>
      <Box>
        <Box>
          <Typography sx={{ fontWeight: 600, lineHeight: "70%" }}>
            &#8358;{currencyFormater(30000)}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "GrayText" }}>
            Last Week
          </Typography>
        </Box>
      </Box>
      <Box>
        <BarChart
          colors={["#FFBE07"]}
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "day" }]}
          yAxis={[{ valueFormatter }]}
          series={[{ dataKey: "sale" }]}
          width={matches ? 300 : 380}
          height={280}
          borderRadius={6}
          margin={{ left: 40 }}
        />
      </Box>
    </Box>
  );
}

export default PerformanceStats;
