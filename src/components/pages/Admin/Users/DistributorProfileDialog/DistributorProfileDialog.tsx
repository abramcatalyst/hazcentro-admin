import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import UserImg from "src/assets/tempimages/user1.png";
import { GLOBAL_COLORS } from "src/utils";
import QuickActions from "./QuickActions";
import ActiveOrders from "./ActiveOrders";
import { MdOutlineStar } from "react-icons/md";
import DistributorStats from "./DistributorStats";

type Props = {
  open: boolean;
  handleClose: () => void;
};

function DistributorProfileDialog({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
            Distributor Profile
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
                width: { xs: "46px", sm: "76px" },
                height: { xs: "46px", sm: "76px" },
                borderRadius: "50%",
              }}
            >
              <img
                src={UserImg}
                alt="user"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
            <Box>
              <Typography
                noWrap
                sx={{ fontWeigh: 600, fontSize: { xs: "17px", sm: "20px" } }}
              >
                Runtown Mart
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  // flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "GrayText" }} variant="body2">
                  Followers:100.
                </Typography>
                <Box sx={{ display: "flex", gap: 0.1, alignItems: "center" }}>
                  {[...Array(5).keys()].map((x) => (
                    <MdOutlineStar
                      key={x}
                      style={{
                        color:
                          x < 3
                            ? GLOBAL_COLORS.YELLOW_500
                            : theme.palette.grey[500],
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Typography sx={{ color: "GrayText" }} variant="body2">
                ID:128jBG9
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ color: "GrayText" }} variant="body2">
              Last Seen: 2 Min, ago
            </Typography>
          </Box>
        </Box>

        <DistributorStats />
        <ActiveOrders />
        <QuickActions />
        <Divider />
        <Box sx={{ my: 1, display: "flex", gap: 1 }}>
          <Button
            size="large"
            fullWidth
            sx={{
              height: "55px",
              background: theme.palette.grey[100],
              color: "#000000",
              "&:hover": {
                background: theme.palette.grey[800],
                color: "#ffffff",
              },
            }}
          >
            Send Message
          </Button>
          <Button
            size="large"
            fullWidth
            sx={{
              height: "55px",
              background: "#FBF5E3",
              color: "#000000",
              "&:hover": {
                background: theme.palette.error.light,
                color: "#ffffff",
              },
            }}
          >
            Go to full Profile
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
export default DistributorProfileDialog;
