import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
import QuickActions from "./QuickActions";
import ProfileTile from "src/components/shared/ProfileTitle/ProfileTile";
import { useTheme } from "@mui/material/styles";

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
      <Box
        sx={{ p: 1, background: theme.palette.grey[50], borderRadius: "12px" }}
      >
        <ProfileTile text="About" />
        <Box>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ea
            laudantium quis reprehenderit mollitia ipsam ad id atque cumque!
            Veritatis quos odit non qui tempore, consectetur praesentium cum!
            Vitae, facere?
          </Typography>
        </Box>
      </Box>
      <QuickActions />
    </Box>
  );
};

export default ProfileDetailsSection;
