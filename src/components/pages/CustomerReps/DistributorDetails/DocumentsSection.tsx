import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
import { MdShareLocation } from "react-icons/md";
import { TbMessageDots, TbMoodSad2 } from "react-icons/tb";
import { BiCheckDouble } from "react-icons/bi";
import { GLOBAL_COLORS } from "src/utils";
import { useTheme, alpha } from "@mui/material/styles";
const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
function DocumentsSection() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        background: "#ffffff",
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2 },
        borderRadius: "16px",
      }}
    >
      <Box>
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="CAC Certificate"
              value="img_s457690pi124587jhy789.png"
              enablePreview
              enableDownload
            />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="TAX/TIN ID Cert."
              value="img_s457690pi124587jhy789.png"
              enablePreview
              enableDownload
            />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="Prof. of Business Premises"
              value="img_s457690pi124587jhy789.png"
              enablePreview
              enableDownload
            />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              title="Warehouse Pictures"
              value="img_s457690pi124587jhy789.png"
              enablePreview
              enableDownload
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1,
          flexWrap: "wrap",
          mt: { xs: 4, sm: 6 },
          mb: 2,
        }}
      >
        <Button color="inherit" startIcon={<TbMessageDots />}>
          Message
        </Button>
        <Button color="inherit" startIcon={<MdShareLocation />}>
          Update
        </Button>
        <Button
          color="error"
          startIcon={<TbMoodSad2 />}
          sx={{
            background: "#EE16160D",

            "&:hover": {
              background: alpha(theme.palette.error.main, 0.2),
            },
          }}
        >
          Decline
        </Button>
        <Button
          color="success"
          startIcon={<BiCheckDouble />}
          sx={{
            background: "#47B48E0D",
            color: GLOBAL_COLORS.GREEN_MAIN,
            "&:hover": {
              background: alpha(GLOBAL_COLORS.GREEN_MAIN, 0.2),
            },
          }}
        >
          Approve
        </Button>
      </Box>
    </Box>
  );
}

export default DocumentsSection;
