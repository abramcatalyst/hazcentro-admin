import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import { BannerType } from "src/types/banners";

type Props = {
  open: boolean;
  selected: BannerType;
  handleClose: () => void;
};

const sizing = { xs: 12, sm: 6 };
type InfoBoxProps = {
  title: string;
  value: string;
};
const InfoBox = ({ title, value }: InfoBoxProps) => {
  return (
    <Box sx={{ my: 1 }}>
      <Typography sx={{ fontSize: "13px" }}>{title}</Typography>
      <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
    </Box>
  );
};
function BannerDetailsDialog({ open, selected, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledDialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="md"
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
          <Typography variant="h6" sx={{ color: "GrayText" }}>
            Banner Details
          </Typography>
          <Box
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F9E9E3",
              ml: "auto",
            }}
          >
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogActions>
      <DialogContent>
        <Box
          component={Paper}
          sx={{
            minHeight: "147px",
            borderRadius: "20px",
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: { xs: "center", sm: "space-between" },
            p: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: { xs: "100%" },
                height: { xs: "100px", sm: "220px" },
              }}
            >
              <img
                src={selected?.image_url}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
          </Box>
          <Typography sx={{ color: "GrayText" }} variant="body2"></Typography>
        </Box>
        <Box sx={{ my: 1 }}>
          <Box
            component={Paper}
            sx={{
              my: 1,
              borderRadius: "20px",
              p: { xs: 1, sm: 2 },
              minHeight: "157px",
            }}
          >
            <Grid container spacing={1}>
              <Grid size={sizing}>
                <InfoBox title="Link target" value={selected?.link_target} />
              </Grid>
              <Grid size={sizing}>
                <InfoBox title="Type" value={selected?.link_type} />
              </Grid>

              <Grid size={sizing}>
                <InfoBox title="Order" value={selected?.order.toString()} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default BannerDetailsDialog;
