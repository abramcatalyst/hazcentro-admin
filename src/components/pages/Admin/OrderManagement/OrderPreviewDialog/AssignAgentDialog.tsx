import { useEffect, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha, useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { fetchAgents } from "src/services/agents";
import { assignAgentToOrder } from "src/services/orders";
import { AgentType } from "src/types/agents";
import { OrderType } from "src/types/orders";
import {
  dialogButtonStyles,
  formatErrorMessage,
  formatSuccessMessage,
  GLOBAL_COLORS,
} from "src/utils";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";

type Props = {
  open: boolean;
  order: OrderType;
  handleClose: () => void;
  onAssigned?: () => void;
};

type AgentOptionType = Pick<AgentType, "id" | "name" | "email" | "phone_number">;

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

function AgentOptionCard({
  agent,
  selected,
  onSelect,
}: {
  agent: AgentOptionType;
  selected: boolean;
  onSelect: () => void;
}) {
  const theme = useTheme();

  return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.5,
        borderRadius: "14px",
        cursor: "pointer",
        border: "1.5px solid",
        borderColor: selected
          ? GLOBAL_COLORS.SECONDARY_MAIN
          : alpha(theme.palette.divider, 0.9),
        bgcolor: selected
          ? alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.08)
          : theme.palette.background.paper,
        boxShadow: selected
          ? `0 8px 24px ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.16)}`
          : "none",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: GLOBAL_COLORS.SECONDARY_MAIN,
          transform: "translateY(-1px)",
          boxShadow: `0 10px 28px ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.14)}`,
        },
      }}
    >
      <Avatar
        sx={{
          width: 44,
          height: 44,
          bgcolor: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.15),
          color: GLOBAL_COLORS.SECONDARY_DARK,
          fontWeight: 700,
          fontSize: "0.95rem",
        }}
      >
        {getInitials(agent.name)}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }} noWrap>
          {agent.name}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }} noWrap>
          {agent.email}
        </Typography>
        {agent.phone_number ? (
          <Typography sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
            {agent.phone_number}
          </Typography>
        ) : null}
      </Box>
      <Radio
        checked={selected}
        value={agent.id}
        sx={{
          color: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.4),
          "&.Mui-checked": { color: GLOBAL_COLORS.SECONDARY_MAIN },
        }}
      />
    </Box>
  );
}

function AssignAgentDialog({ open, order, handleClose, onAssigned }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const deliveryState = order?.order_delivery?.state;
  const currentAgentId = order?.agent_id || order?.agent?.id || "";
  const isReassigning = Boolean(currentAgentId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_AGENTS, "assign-agent-dialog"],
    queryFn: () => fetchAgents({ limit: 200, page: 1, status: "true" }),
    enabled: open,
  });

  const eligibleAgents = useMemo(() => {
    if (!data?.data || !deliveryState) {
      return [];
    }

    return data.data.filter((agent) =>
      agent.states?.some(
        (agentState) =>
          agentState.state.toLowerCase() === deliveryState.toLowerCase()
      )
    );
  }, [data?.data, deliveryState]);

  const selectableAgents = useMemo(
    () =>
      isReassigning
        ? eligibleAgents.filter((agent) => agent.id !== currentAgentId)
        : eligibleAgents,
    [eligibleAgents, currentAgentId, isReassigning]
  );

  const currentAgent = useMemo(() => {
    const fromList = eligibleAgents.find((agent) => agent.id === currentAgentId);
    if (fromList) {
      return fromList;
    }

    if (!order?.agent?.id) {
      return null;
    }

    return {
      id: order.agent.id,
      name: order.agent.name,
      email: order.agent.email || "",
      phone_number: order.agent.phone_number || "",
    };
  }, [eligibleAgents, currentAgentId, order?.agent]);

  useEffect(() => {
    if (open) {
      setSelectedAgentId("");
    }
  }, [open]);

  const handleCloseModal = () => {
    if (isSubmitting) {
      return;
    }

    setSelectedAgentId("");
    handleClose();
  };

  const handleSubmit = async () => {
    if (!selectedAgentId) {
      toast.error("Select an agent to continue.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await assignAgentToOrder(order.id, selectedAgentId);
      toast.success(formatSuccessMessage(res));
      setSelectedAgentId("");
      onAssigned?.();
      handleClose();
    } catch (submitError) {
      toast.error(formatErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const emptyMessage = useMemo(() => {
    if (!deliveryState) {
      return "This order has no delivery state, so agents cannot be matched.";
    }

    if (isReassigning && eligibleAgents.length === 1 && currentAgent) {
      return `${currentAgent.name} is the only active agent covering ${deliveryState}. There are no other agents to reassign to.`;
    }

    if (isReassigning) {
      return `No other active agents cover ${deliveryState}.`;
    }

    return `No active agents cover ${deliveryState}.`;
  }, [currentAgent, deliveryState, eligibleAgents.length, isReassigning]);

  let content = <HalfScreenLoader />;

  if (isError) {
    content = <HalfScreenError text={formatErrorMessage(error)} />;
  } else if (!isLoading && data) {
    content = (
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            mb: 2.5,
            p: 2,
            borderRadius: "16px",
            background: `linear-gradient(135deg, ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.12)} 0%, ${alpha(GLOBAL_COLORS.CYAN_MAIN, 0.08)} 100%)`,
            border: `1px solid ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.2)}`,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
            <Chip
              size="small"
              label={deliveryState || "Unknown state"}
              sx={{
                bgcolor: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.14),
                color: GLOBAL_COLORS.SECONDARY_DARK,
                fontWeight: 600,
              }}
            />
            <Typography sx={{ color: "text.secondary", fontSize: "0.82rem" }}>
              Delivery coverage
            </Typography>
          </Stack>
          <Typography sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
            {isReassigning
              ? "Choose another agent who covers this state."
              : "Choose an agent who covers this delivery state."}
          </Typography>
        </Box>

        {isReassigning && currentAgent ? (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: "14px",
              border: `1px dashed ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.35)}`,
              bgcolor: alpha(GLOBAL_COLORS.GREY_50, 0.9),
            }}
          >
            <Typography
              sx={{
                fontSize: "0.72rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              Currently assigned
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.18),
                  color: GLOBAL_COLORS.SECONDARY_DARK,
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                {getInitials(currentAgent.name)}
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "0.92rem" }}>
                  {currentAgent.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                  {currentAgent.email}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ) : null}

        {selectableAgents.length > 0 ? (
          <Stack spacing={1.25}>
            {selectableAgents.map((agent) => (
              <AgentOptionCard
                key={agent.id}
                agent={agent}
                selected={selectedAgentId === agent.id}
                onSelect={() => setSelectedAgentId(agent.id)}
              />
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              py: 4,
              px: 2,
              textAlign: "center",
              borderRadius: "16px",
              border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
              bgcolor: alpha(GLOBAL_COLORS.GREY_50, 0.7),
            }}
          >
            <PersonSearchRoundedIcon
              sx={{
                fontSize: 40,
                color: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.55),
                mb: 1,
              }}
            />
            <Typography sx={{ fontWeight: 600, mb: 0.5 }}>
              {isReassigning ? "No other agents available" : "No agents available"}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
              {emptyMessage}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <StyledDialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleCloseModal}
      maxWidth="sm"
    >
      <DialogActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            px: { xs: 1, sm: 2 },
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                display: "grid",
                placeItems: "center",
                bgcolor: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.12),
                color: GLOBAL_COLORS.SECONDARY_DARK,
              }}
            >
              <SwapHorizRoundedIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
              {isReassigning ? "Reassign Agent" : "Assign Agent"}
            </Typography>
          </Stack>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleCloseModal} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent
        sx={{
          minHeight: "280px",
          display: "flex",
          alignItems: isLoading ? "center" : "flex-start",
          justifyContent: "center",
          pt: 1,
        }}
      >
        {content}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button
          variant="outlined"
          onClick={handleCloseModal}
          disabled={isSubmitting}
          sx={dialogButtonStyles}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || selectableAgents.length === 0}
          sx={{
            ...dialogButtonStyles,
            bgcolor: GLOBAL_COLORS.SECONDARY_MAIN,
            "&:hover": { bgcolor: GLOBAL_COLORS.SECONDARY_DARK },
          }}
        >
          {isSubmitting
            ? "Saving..."
            : isReassigning
              ? "Confirm Reassign"
              : "Confirm Assign"}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default AssignAgentDialog;
