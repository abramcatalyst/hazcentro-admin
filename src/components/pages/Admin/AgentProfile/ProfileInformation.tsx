import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { formatErrorMessage, GLOBAL_COLORS } from "src/utils";
import MaleAvatar from "src/assets/images/avatar-male.png";
import FemaleAvatar from "src/assets/images/avatar-female.png";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015

import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { AgentType } from "src/types/agents";
import EditAgentDialog from "../Agents/EditAgentDialog";

dayjs.extend(advancedFormat);
type InfoBoxProps = {
  title: string;
  value: string | number;
};

export const InfoBox = ({ title, value }: InfoBoxProps) => {
  return (
    <Box sx={{ my: 0.5 }}>
      <Typography
        sx={{
          color: "#06193A80",
          fontSize: "12px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: "#312F2780",
          fontSize: "15px",
          fontWeight: 500,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export const InverseInfoBox = ({ title, value }: InfoBoxProps) => {
  return (
    <Box sx={{ my: 0.5 }}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          color: "#06193A80",
          fontSize: "12px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
export type AgentProfileProps = {
  isPending: boolean;
  error: Error | null;
  isError: boolean;
  data: AgentType | undefined;
};
const ProfileInformation = ({
  isPending,
  isError,
  error,
  data,
}: AgentProfileProps) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const theme = useTheme();
  const sizing = { xs: 12, sm: 6 };

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return data ? (
    <Box component={Paper} sx={{ p: 1, borderRadius: "20px" }} elevation={0}>
      {openEditDialog && (
        <EditAgentDialog
          open={openEditDialog}
          selectedAgent={data}
          handleClose={handleCloseEditDialog}
        />
      )}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
          User Profile
        </Typography>
        <Button
          color="inherit"
          sx={{
            background: theme.palette.grey[100],
            "&:hover": { background: theme.palette.grey[200] },
          }}
          onClick={() => handleOpenEditDialog()}
        >
          Edit
        </Button>
      </Box>
      <Box
        sx={{
          background: "#FBE6C41A",
          py: { xs: 1, sm: 2 },
          borderRadius: "12px",
          border: `1px solid #F6F6F6`,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
          <Box
            sx={{
              borderRadius: "50%",
              p: 0.5,
            }}
          >
            <img
              src={data?.gender === "male" ? MaleAvatar : FemaleAvatar}
              alt={"user"}
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box>
            <Typography noWrap sx={{ fontSize: { xs: "14px", sm: "18px" } }}>
              {data?.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>{data?.state}</Typography>
              {renderStatus(data?.status)}
            </Box>
          </Box>
        </Box>
        <Button
          color="secondary"
          variant="outlined"
          sx={{
            borderRadius: "12px",
            MozOutlineRadius: "12px",
            border: `2px solid ${GLOBAL_COLORS.SECONDARY_MAIN}`,
          }}
        >
          Message
        </Button>
      </Box>
      <Box
        sx={{
          my: 1,
          background: GLOBAL_COLORS.GREY_10,
          borderRadius: "12px",
          p: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <InfoBox title="Full Name" value={data?.name} />
          </Grid>
          <Grid size={sizing}>
            <InfoBox
              title="State/Region"
              value={`${data?.state}/${data?.country}`}
            />
          </Grid>
          <Grid size={sizing}>
            <InfoBox title="Phone Number" value={data?.phone_number} />
          </Grid>
          <Grid size={sizing}>
            <InfoBox title="Gender" value={data?.gender} />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          my: 1,
          background: GLOBAL_COLORS.GREY_10,
          borderRadius: "12px",
          p: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <InverseInfoBox
              title="Complete Order"
              value={data?.completed_orders}
            />
          </Grid>
          <Grid size={sizing}>
            <InverseInfoBox
              title="Incomplete Order"
              value={data?.incomplete_orders}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="subtitle2" align="right">
          Agent Added: {dayjs(data?.created_at).format("MMM Do, YYYY")}
        </Typography>
      </Box>
    </Box>
  ) : null;
};

export default memo(ProfileInformation);
