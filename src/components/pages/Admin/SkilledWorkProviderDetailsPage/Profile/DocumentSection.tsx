import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const DocumentSection = () => {
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
            <ProfileInfoBox title="ID Type" value="NIMC" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="ID Number" value="1234560987345" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Prof. Certificate" value="Esther" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="Uploaded ID"
              value="johndoecom"
              enablePreview
              enableDownload
            />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="Uploaded Prof. Cert."
              value="Nigeria"
              enablePreview
              enableDownload
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DocumentSection;
