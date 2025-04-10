import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import TopSection from "./TopSection";
import ProductInformation from "./ProductInformation";
import PaymentInformationSection from "./PaymentInformationSection";
import OrderStages from "./OrderStages";
import { OrderType } from "src/types/orders";

type Props = {
  open: boolean;
  selectedOrder: OrderType;
  handleClose: () => void;
};

function OrderPreviewDialog({ open, selectedOrder, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  console.log("ssssssssssssss", selectedOrder);
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
            {""}
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <TopSection selectedOrder={selectedOrder} />
        <Box>
          <Grid container spacing={1} columns={5}>
            <Grid size={{ xs: 5, sm: 3 }}>
              <ProductInformation selectedOrder={selectedOrder} />
            </Grid>
            <Grid size={{ xs: 5, sm: 2 }}>
              <PaymentInformationSection selectedOrder={selectedOrder} />
            </Grid>
          </Grid>
          <OrderStages />
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default OrderPreviewDialog;
