import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import UserImage from "src/assets/images/avatar-male.png";
import { alpha } from "@mui/material/styles";
import { currencyFormater, GLOBAL_COLORS } from "src/utils";
import { OrderType } from "src/types/orders";
import AssignAgentDialog from "./AssignAgentDialog";

const sizing = { xs: 12, sm: 4, md: 3 };

type Props = {
  selectedOrder: OrderType;
  onAgentAssigned?: () => void;
};

function getInitials(name?: string): string {
  if (!name) {
    return "?";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function TopSection({ selectedOrder, onAgentAssigned }: Props) {
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const hasAgent = Boolean(selectedOrder?.agent?.id || selectedOrder?.agent_id);
  const deliveryState = selectedOrder?.order_delivery?.state;

  return (
    <>
      <Box
        sx={{
          my: 1,
          background: GLOBAL_COLORS.GREY_50,
          p: { xs: 1, sm: 1.25 },
          borderRadius: "20px",
        }}
      >
        <Grid container spacing={1.25}>
          <Grid size={sizing}>
            <Box
              sx={{
                display: "flex",
                gap: 1.25,
                alignItems: "center",
                background: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.09),
                p: 1.25,
                borderRadius: "16px",
                border: `1px solid ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.14)}`,
                minHeight: 88,
              }}
            >
              <Box
                component="img"
                src={UserImage}
                alt="buyer"
                sx={{
                  width: 56,
                  height: 56,
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <Box>
                <Chip
                  label="Buyer"
                  size="small"
                  sx={{
                    height: 20,
                    mb: 0.5,
                    fontSize: "0.68rem",
                    bgcolor: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.12),
                    color: GLOBAL_COLORS.SECONDARY_DARK,
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: GLOBAL_COLORS.SECONDARY_DARK,
                  }}
                >
                  {selectedOrder?.buyer?.name}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={sizing}>
            <Box
              sx={{
                p: 1.25,
                borderRadius: "16px",
                minHeight: 88,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: hasAgent
                  ? `linear-gradient(135deg, ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.14)} 0%, ${alpha(GLOBAL_COLORS.CYAN_MAIN, 0.08)} 100%)`
                  : `linear-gradient(135deg, ${alpha("#FF9800", 0.12)} 0%, ${alpha("#FF5722", 0.06)} 100%)`,
                border: `1px solid ${
                  hasAgent
                    ? alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.22)
                    : alpha("#FF9800", 0.28)
                }`,
              }}
            >
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
                spacing={1}
              >
                <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: hasAgent
                        ? alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.2)
                        : alpha("#FF9800", 0.18),
                      color: hasAgent ? GLOBAL_COLORS.SECONDARY_DARK : "#E65100",
                      fontWeight: 700,
                    }}
                  >
                    {hasAgent ? getInitials(selectedOrder?.agent?.name) : "?"}
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Chip
                      label={hasAgent ? "Assigned" : "Unassigned"}
                      size="small"
                      sx={{
                        height: 20,
                        mb: 0.5,
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        bgcolor: hasAgent
                          ? alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.16)
                          : alpha("#FF9800", 0.16),
                        color: hasAgent ? GLOBAL_COLORS.SECONDARY_DARK : "#E65100",
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "text.primary",
                      }}
                      noWrap
                    >
                      {hasAgent ? selectedOrder?.agent?.name : "No agent yet"}
                    </Typography>
                    {hasAgent && selectedOrder?.agent?.email ? (
                      <Typography
                        sx={{ color: "text.secondary", fontSize: "0.76rem" }}
                        noWrap
                      >
                        {selectedOrder.agent.email}
                      </Typography>
                    ) : deliveryState ? (
                      <Typography sx={{ color: "text.secondary", fontSize: "0.76rem" }}>
                        Needs coverage in {deliveryState}
                      </Typography>
                    ) : null}
                  </Box>
                </Stack>

                <Button
                  size="small"
                  variant="contained"
                  startIcon={
                    hasAgent ? (
                      <SwapHorizRoundedIcon sx={{ fontSize: "1rem !important" }} />
                    ) : (
                      <PersonAddAltRoundedIcon sx={{ fontSize: "1rem !important" }} />
                    )
                  }
                  onClick={() => setAssignDialogOpen(true)}
                  sx={{
                    flexShrink: 0,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    borderRadius: "10px",
                    px: 1.25,
                    py: 0.5,
                    boxShadow: "none",
                    color: "#fff",
                    bgcolor: hasAgent
                      ? GLOBAL_COLORS.SECONDARY_MAIN
                      : "#FF9800",
                    "& .MuiButton-startIcon": {
                      color: "#fff",
                    },
                    "&:hover": {
                      color: "#fff",
                      boxShadow: `0 8px 20px ${alpha(
                        hasAgent ? GLOBAL_COLORS.SECONDARY_MAIN : "#FF9800",
                        0.28
                      )}`,
                      bgcolor: hasAgent
                        ? GLOBAL_COLORS.SECONDARY_DARK
                        : "#F57C00",
                    },
                  }}
                >
                  {hasAgent ? "Reassign" : "Assign"}
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid size={sizing}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 88,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 1,
              }}
            >
              <Typography sx={{ color: "text.secondary", fontSize: "0.78rem", mb: 0.25 }}>
                Order total
              </Typography>
              <Typography sx={{ fontSize: "1.35rem", fontWeight: 700, color: "text.primary" }}>
                &#8358;{currencyFormater(selectedOrder?.total_price, 2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <AssignAgentDialog
        open={assignDialogOpen}
        order={selectedOrder}
        handleClose={() => setAssignDialogOpen(false)}
        onAssigned={onAgentAssigned}
      />
    </>
  );
}

export default TopSection;
