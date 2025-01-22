import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { GLOBAL_COLORS } from "src/utils";
import MaleAvatar from "src/assets/images/avatar-male.png";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015

dayjs.extend(advancedFormat);
type InfoBoxProps = {
  title: string;
  value: string;
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
const ProfileInformation = () => {
  const theme = useTheme();
  const sizing = { xs: 12, sm: 6 };
  return (
    <Box component={Paper} sx={{ p: 1, borderRadius: "20px" }} elevation={0}>
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
              src={MaleAvatar}
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
              Anthony Gregson
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>Lagos</Typography>
              {renderStatus("active")}
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
            <InfoBox title="Full Name" value={"Anthony Greg"} />
          </Grid>
          <Grid size={sizing}>
            <InfoBox title="State/Region" value={"Lagos state"} />
          </Grid>
          <Grid size={sizing}>
            <InfoBox title="Phone Number" value={"2348109870987"} />
          </Grid>
          <Grid size={sizing}>
            <InfoBox title="Gender" value={"Male"} />
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
            <InverseInfoBox title="Complete Order" value={"50"} />
          </Grid>
          <Grid size={sizing}>
            <InverseInfoBox title="Incomplete Order" value={"3"} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="subtitle2" align="right">
          Agent Added: {dayjs().format("MMM Do, YYYY")}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
