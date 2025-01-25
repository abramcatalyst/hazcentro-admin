import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ProductImg from "src/assets/tempimages/img1.png";
import { currencyFormater } from "src/utils";
import dayjs from "dayjs";

type Props = {
  open: boolean;
  handleClose: () => void;
};

function ProductDetailsDialog({ open, handleClose }: Props) {
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
          <Typography sx={{ color: "GrayText" }}></Typography>
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
        <Box>
          <Box
            sx={{ width: "100%", height: "308px", borderRadius: "12px", mb: 1 }}
          >
            <img
              src={ProductImg}
              alt="Product"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>

          <Box>
            <Typography
              noWrap
              sx={{ fontWeigh: 600, fontSize: { xs: "17px", sm: "22px" } }}
            >
              iPhone 34 Pro Max
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.7,
                  }}
                >
                  <Typography sx={{ color: "GrayText" }} variant="body2">
                    SKU:128jBG9
                  </Typography>
                  <Typography sx={{ color: "GrayText" }} variant="body2">
                    Created: {dayjs().format("MM Do, YYYY")}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Chip
                    variant="filled"
                    size="small"
                    label="Runtown Store"
                    sx={{ background: "#FFEAEA" }}
                  />
                  <Chip variant="filled" size="small" label="Gadjet" />
                </Box>
              </Box>
              <Typography
                noWrap
                sx={{
                  fontWeigh: 600,
                  fontSize: { xs: "17px", sm: "22px" },
                }}
              >
                &#8358;{currencyFormater(50000)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ my: 1 }}>
            <Typography variant="body2" sx={{ color: "GrayText" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              eos temporibus officiis velit nisi placeat quam itaque natus
              maiores sit illum tempore, nihil labore ipsa repellat a magnam
              molestiae! Voluptas!
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
export default ProductDetailsDialog;
