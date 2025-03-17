import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const ProfileInfo = () => {
  return (
    <Box my={2}>
      <Grid container spacing={1}>
        <Grid size={sizing}>
          <ProfileInfoBox title="Business Name" value="Esther" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Biz. Reg. Number" value="Esther" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Nature of Business" value="Esther" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Sector Industry" value="johndoe@gmail.com" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Website" value="Nigeria" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Biz. Phone Number" value="Delta" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Your Role/Position" value="23487909808" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Means of ID" value="23487909808" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="ID No." value="23487909808" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileInfo;
