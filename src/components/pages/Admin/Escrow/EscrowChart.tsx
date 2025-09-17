import { LineChart, areaElementClasses } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";

import { ScaleLinear } from "d3-scale";
import { currencyFormater, valueFormatter } from "src/utils";
import { useDrawingArea, useYScale } from "@mui/x-charts";
import { green } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { EscrowActiveBalanceType } from "src/types/escrow";
const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 4000, 3000, 2000, 2780, 1890, 2390,
];
const xLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
type Props = {
  data: EscrowActiveBalanceType;
};
export default function EscrowChart({ data }: Props) {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          &#8358;{currencyFormater(data?.active_escrow_balance, 2)}
        </Typography>
        <IconButton>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
      <LineChart
        xAxis={[{ data: xLabels, scaleType: "point" }]}
        yAxis={[{ valueFormatter }]}
        series={[{ data: uData, showMark: false, area: true }]}
        height={250}
        margin={{ top: 10, bottom: 30, left: 35, right: 10 }}
        sx={{
          overflow: "hidden",
          [`& .${areaElementClasses.root}`]: {
            fill: "url(#swich-color-id-2)",
          },
        }}
      >
        <ColorPalette id="swich-color-id-2" />

        {/* <rect
          x={0}
          y={0}
          width={5}
          height="100%"
          fill="url(#swich-color-id-2)"
        /> */}
      </LineChart>
    </Box>
  );
}

function ColorPalette({ id }: { id: string }) {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  const scale = useYScale() as ScaleLinear<number, number>; // You can provide the axis Id if you have multiple ones

  return (
    <defs>
      <linearGradient
        id={id}
        x1="0"
        x2="0"
        y1="0"
        // y2={`${svgHeight}px`}
        y2={`100%`}
        gradientUnits="userSpaceOnUse" // Use the SVG coordinate instead of the component ones.
      >
        <stop
          offset={scale(5000) / svgHeight}
          stopColor={green[900]}
          stopOpacity={1}
        />

        <stop
          offset={2}
          stopColor={alpha(green["A100"], 0.5)}
          stopOpacity={0.2}
        />
      </linearGradient>
    </defs>
  );
}
