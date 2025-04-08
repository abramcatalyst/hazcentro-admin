import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import NavigateBeforeSharpIcon from "@mui/icons-material/NavigateBeforeSharp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ProductImg from "src/assets/images/logo.png";
import { currencyFormater } from "src/utils";
import { ProductFromCategoryType } from "src/types/products";
import dayjs from "dayjs";
type Props = {
  open: boolean;
  handleClose: () => void;
  selectedProduct: ProductFromCategoryType;
};

function ProductDetailsDialog({ open, selectedProduct, handleClose }: Props) {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("bbbbbbbbbbbbbb", selectedProduct);
  const handleClickNext = () => {
    setCurrent((curr) => {
      if (curr === selectedProduct?.media?.length - 1) {
        return 0;
      }
      return curr + 1;
    });
  };
  const handleClickPrev = () => {
    setCurrent((curr) => {
      if (curr === 0) {
        return selectedProduct?.media?.length - 1;
      }
      return curr - 1;
    });
  };
  const currentImage =
    selectedProduct?.media[current]?.original_url || ProductImg;
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
            sx={{ width: "100%", height: "280px", borderRadius: "12px", mb: 1 }}
          >
            <img
              src={currentImage}
              alt="Product"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
          {selectedProduct?.media?.length > 0 && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  handleClickPrev();
                }}
              >
                <NavigateBeforeSharpIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleClickNext();
                }}
              >
                <NavigateNextSharpIcon />
              </IconButton>
            </Box>
          )}
          <Box>
            <Typography
              noWrap
              sx={{ fontWeigh: 600, fontSize: { xs: "17px", sm: "22px" } }}
            >
              {selectedProduct?.name}
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
                    {selectedProduct?.sku}
                  </Typography>
                  <Typography sx={{ color: "GrayText" }} variant="body2">
                    Created:{" "}
                    {dayjs(selectedProduct?.created_at).format("MM Do, YYYY")}
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
                &#8358;{currencyFormater(selectedProduct?.price, 2)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ my: 1 }}>
            <Typography variant="body2" sx={{ color: "GrayText" }}>
              {selectedProduct?.description}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
export default ProductDetailsDialog;
