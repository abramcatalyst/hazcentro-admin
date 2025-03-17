import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const DocumentInfo = () => {
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
            <ProfileInfoBox
              title="CAC Certificate"
              value="uyt6789"
              enablePreview
              enableDownload
            />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="TAX/TIN ID Cert"
              value="1234560987345"
              enablePreview
              enableDownload
            />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Prof. of Biz. Premises" value="Esther" />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="Warehouse Picture"
              value="johndoecom"
              enablePreview
              enableDownload
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DocumentInfo;
