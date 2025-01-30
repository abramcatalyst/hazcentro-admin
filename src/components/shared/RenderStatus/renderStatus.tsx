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
];
const greenStates = [
  "approved",
  "success",
  "won",
  "paid",
  "active",
  "delivered",
];
const yellowStates = ["processing", "ongoing"];

const renderStatus = (stat: string | boolean | number | null | undefined) => {
  const theme = useTheme();

  if (stat === "canceled" || stat === "cancelled") {
    return (
      <Chip
        sx={{ background: "black", color: "#fff" }}
        label={stat}
        size="small"
      />
    );
  }
  if (stat === "pending" || stat === "Not Claimed") {
    return <Chip color="warning" label={stat} size="small" />;
  }
  if (typeof stat === "string" && redStates.includes(stat)) {
    return <Chip color="error" label={stat} size="small" />;
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
        <Typography sx={{ fontSize: "12.3px", textTransform: "capitalize" }}>
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
        <Typography sx={{ fontSize: "12.3px", textTransform: "capitalize" }}>
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
  if (stat === "Claimed") {
    return <Chip color="success" label={stat} size="small" />;
  }
  if (typeof stat === "undefined") {
    return <Chip color="error" label={"Error"} size="small" />;
  }
  return <Chip label={stat} color="success" size="small" />;
};

export default renderStatus;
