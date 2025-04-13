import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/";

const redStates = [
  "lost",
  "inactive",
  "rejected",
  "failed",
  "not active",
  "not set",
  "unapproved",
  "ended",
  "offline",
  "not paid",
  "cancelled",
  "canceled",
  "suspended",
];
const greenStates = [
  "approved",
  "success",
  "won",
  "paid",
  "active",
  "delivered",
  "complete",
  "completed",
];
const yellowStates = ["ongoing", "pending", "not claimed"];
const blueStates = ["processing"];

const renderStatus = (stat: string | boolean | number | null | undefined) => {
  const theme = useTheme();

  if (typeof stat === "string" && redStates.includes(stat)) {
    return (
      <Box sx={{ display: "flex", gap: 0.5, my: 0.4, alignItems: "center" }}>
        <Box
          sx={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: theme.palette.error.light,
          }}
        />
        <Typography sx={{ fontSize: "12px", textTransform: "capitalize" }}>
          {stat || "Not active"}
        </Typography>
      </Box>
    );
  }

  if (typeof stat === "string" && yellowStates?.includes(stat)) {
    return (
      <Box sx={{ display: "flex", gap: 0.5, my: 0.4, alignItems: "center" }}>
        <Box
          sx={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: theme.palette.warning.main,
          }}
        />
        <Typography
          sx={{
            fontSize: "12.3px",
            textTransform: "capitalize",
            color: theme.palette.warning.main,
          }}
        >
          {stat || "Processing"}
        </Typography>
      </Box>
    );
  }
  if (typeof stat === "string" && blueStates?.includes(stat)) {
    return (
      <Box sx={{ display: "flex", gap: 0.5, my: 0.4, alignItems: "center" }}>
        <Box
          sx={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: theme.palette.info.main,
          }}
        />
        <Typography
          sx={{
            fontSize: "12.3px",
            textTransform: "capitalize",
            color: theme.palette.info.main,
          }}
        >
          {stat || "Processing"}
        </Typography>
      </Box>
    );
  }
  if (typeof stat === "boolean" && stat === true) {
    return <Chip color="success" label={"Active"} size="small" />;
  }
  if (typeof stat === "boolean" && stat === false) {
    return <Chip color="error" label={"Not active"} size="small" />;
  }
  if (typeof stat === "string" && greenStates?.includes(stat)) {
    return (
      <Box sx={{ display: "flex", gap: 0.5, my: 0.4, alignItems: "center" }}>
        <Box
          sx={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: theme.palette.success.light,
          }}
        />
        <Typography sx={{ fontSize: "12px", textTransform: "capitalize" }}>
          {stat || "Active"}
        </Typography>
      </Box>
    );
  }
  if (Boolean(stat) === true) {
    return <Chip color="success" label={"Active"} size="small" />;
  }
  if (Boolean(stat) === false) {
    return <Chip color="error" label={"Not active"} size="small" />;
  }

  if (typeof stat === "undefined") {
    return <Chip color="error" label={"Error"} size="small" />;
  }
  return <Chip label={stat} color="success" size="small" />;
};

export default renderStatus;
