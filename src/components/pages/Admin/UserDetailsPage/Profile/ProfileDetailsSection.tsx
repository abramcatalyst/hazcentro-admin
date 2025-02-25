import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import MaleAvatar from "src/assets/tempimages/user1.png";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
import QuickActions from "./QuickActions";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const ProfileDetailsSection = () => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      sx={{
        p: 1,
        mb: 1,
        width: "100%",
      }}
      elevation={0}
    >
      <Box sx={{ my: 3 }}>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 500,
          }}
        >
          Profile Info
        </Typography>{" "}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          flexWrap: "wrap",
          background: "#F7F7F97A",
          py: 2,
          px: 1,
          borderRadius: "20px",
        }}
      >
        <Box sx={{ borderRadius: "50%", width: "104px", height: "104px" }}>
          <img
            alt="user"
            src={MaleAvatar}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </Box>
        <Box sx={{}}>
          <Typography
            sx={{
              fontSize: "19px",
              fontWeight: 500,
            }}
          >
            Jason Suter
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: "12px",

              color: theme.palette.grey[800],
            }}
          >
            User ID: 123457865
          </Typography>{" "}
        </Box>
      </Box>
      <Box my={2}>
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <ProfileInfoBox title="First Name" value="Esther" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Last Name" value="Esther" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Middle Name" value="Esther" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Email Address" value="johndoe@gmail.com" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Country" value="Nigeria" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="State" value="Delta" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Phone" value="23487909808" />
          </Grid>
        </Grid>
      </Box>
      <QuickActions />
    </Box>
  );
};

export default ProfileDetailsSection;
