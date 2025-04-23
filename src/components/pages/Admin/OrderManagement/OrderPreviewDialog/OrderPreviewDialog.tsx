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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { formatErrorMessage } from "src/utils";
import { fetchSingleOrder } from "src/services/orders";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { useEffect } from "react";

type Props = {
  open: boolean;
  selectedOrder: OrderType;
  handleClose: () => void;
};

function OrderPreviewDialog({ open, selectedOrder, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const { error, data, isError, refetch } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ORDER,
      { selectedOrder, open },
    ],
    queryFn: () => fetchSingleOrder(selectedOrder?.id),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ORDER],
      });
    };
  }, []);

  let content = (
    <DialogContent>
      <HalfScreenLoader />
    </DialogContent>
  );

  if (isError) {
    content = (
      <DialogContent>
        <HalfScreenError text={formatErrorMessage(error)} />
      </DialogContent>
    );
  }
  if (data) {
    content = (
      <DialogContent>
        <TopSection selectedOrder={data} />
        <Box>
          <Grid container spacing={1} columns={6}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <ProductInformation selectedOrder={data} />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <PaymentInformationSection selectedOrder={data} />
            </Grid>
          </Grid>
          <OrderStages selectedOrder={data} refetch={refetch} />
        </Box>
      </DialogContent>
    );
  }
  return (
    <StyledDialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="lg"
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
      {content}
    </StyledDialog>
  );
}
export default OrderPreviewDialog;
