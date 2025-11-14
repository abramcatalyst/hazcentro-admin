import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { GLOBAL_COLORS } from "src/utils";
import MaleAvatar from "src/assets/images/avatar-male.png";
import FemaleAvatar from "src/assets/images/avatar-female.png";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import useAuthStore from "src/store/authStore";
import { InfoBox } from "src/components/pages/Admin/AgentProfile/ProfileInformation";

dayjs.extend(advancedFormat);

const ProfileInformation = () => {
  const { profile } = useAuthStore();
  const sizing = { xs: 12, sm: 6 };

  return (
    <Box component={Paper} sx={{ p: 1, borderRadius: "20px" }} elevation={0}>
      <Box
        sx={{
          background: "#dffdff1a",
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
              width: { xs: "50px", sm: "75px", md: "100px" },
              height: { xs: "50px", sm: "75px", md: "100px" },
            }}
          >
            <img
              src={profile?.gender === "male" ? MaleAvatar : FemaleAvatar}
              alt={"user"}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box>
            <Typography noWrap sx={{ fontSize: { xs: "14px", sm: "18px" } }}>
              {profile?.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">{profile?.id}</Typography>
            </Box>
          </Box>
        </Box>
        {renderStatus(profile?.status)}
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
            <InfoBox title="Full Name" value={profile?.name || ""} />
          </Grid>
          <Grid size={sizing}>
            <InfoBox
              title="Phone Number"
              value={profile?.phone_number || "N/A"}
            />
          </Grid>
          <Grid size={sizing}>
            <InfoBox title="Email" value={profile?.email || "N/A"} />
          </Grid>
          <Grid size={sizing}>
            <InfoBox title="State" value={profile?.state || "N/A"} />
          </Grid>

          <Grid size={sizing}>
            <InfoBox title="Gender" value={profile?.gender || "N/A"} />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="subtitle2" align="right">
          Agent Added: {dayjs(profile?.created_at).format("MMM Do, YYYY")}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(ProfileInformation);
