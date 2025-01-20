import Chip from "@mui/material/Chip";

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
const greenStates = ["approved", "success", "won", "paid"];
export const renderSlipStatus = (stat: string | boolean) => {
  if (stat === null) {
    return null;
  }
  if (stat === false) {
    return <Chip color="error" label={"lost"} size="small" />;
  }

  return <Chip color="success" label={"won"} size="small" />;
};

export const renderDrawStatus = (stat: boolean) => {
  if (stat === false) {
    return <Chip color="error" label={"Unapproved"} size="small" />;
  }

  return <Chip color="success" label={"Approved"} size="small" />;
};

const renderStatus = (stat: string | boolean | number | null | undefined) => {
  if (stat === "blacklisted") {
    return (
      <Chip
        sx={{ background: "black", color: "#fff" }}
        label={stat}
        size="small"
      />
    );
  }

  if (stat === "held") {
    return (
      <Chip
        sx={{ background: "black", color: "#fff" }}
        label={stat}
        size="small"
      />
    );
  }
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

  if (stat === "ongoing") {
    return <Chip color="warning" label={stat} size="small" />;
  }
  if (typeof stat === "boolean" && stat === true) {
    return <Chip color="success" label={"Active"} size="small" />;
  }
  if (typeof stat === "boolean" && stat === false) {
    return <Chip color="error" label={"Not active"} size="small" />;
  }
  if (typeof stat === "string" && greenStates?.includes(stat)) {
    return <Chip color="success" label={stat} size="small" />;
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
