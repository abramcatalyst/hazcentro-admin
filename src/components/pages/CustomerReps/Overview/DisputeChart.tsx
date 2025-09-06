import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import { useQuery } from "@tanstack/react-query";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import TableSkeletonLoader from "src/components/shared/TableSkeletonLoader/TableSkeletonLoader";
import { fetchAgentDisputesTrends } from "src/services/agents";
import { formatErrorMessage } from "src/utils";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";

export const dataset = [
  { date: "JAN", dl: 34260.29 },
  { date: "FEB", dl: 34590.93 },
  { date: "MAR", dl: 34716.44 },
  { date: "APR", dl: 55528.715 },
  { date: "MAY", dl: 36205.574 },
  { date: "JUN", dl: 38014.137 },
  { date: "JUL", dl: 33752.207 },
  { date: "AUG", dl: 50715.434 },
  { date: "SEP", dl: 38962.938 },
  { date: "OCT", dl: 41109.582 },
  { date: "NOV", dl: 43189 },
  { date: "DEC", dl: 43320 },
];

function DisputeChart() {
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_CUSTOMER_CARE_DISPUTES_TRENDS,
      {},
    ],
    queryFn: () => fetchAgentDisputesTrends(),
  });

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <TableSkeletonLoader />;
  }

  return (
    <Box>
      <Box sx={{ my: 1 }}>
        <Typography variant="subtitle2">Dispute Trends Over Time</Typography>
      </Box>
      <LineChart
        dataset={data}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            // strokeDasharray: "10 5",
            strokeWidth: 0,
          },
          "& .MuiAreaElement-series-Germany": {
            fill: "url('#myGradient')",
          },
        }}
        xAxis={[
          // {
          //   id: "Years",
          //   dataKey: "date",
          //   scaleType: "time",
          //   valueFormatter: (date) => date,
          // },
          {
            id: "Years",
            scaleType: "point",
            dataKey: "month",
          },
        ]}
        yAxis={[
          {
            id: "Amount",
            scaleType: "linear",
          },
        ]}
        series={[
          {
            id: "Germany",
            dataKey: "value",
            stack: "total",
            area: true,
            showMark: false,
          },
        ]}
        margin={{ left: 50, top: 10, right: 10 }}
        height={300}
      >
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="5%" stopColor="#6255FA61" />
            <stop offset="95%" stopColor="#6255FA11" />
          </linearGradient>
        </defs>
      </LineChart>
    </Box>
  );
}

export default DisputeChart;
