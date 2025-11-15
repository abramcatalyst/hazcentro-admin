import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Logo from "src/assets/images/logo.png";

import Typography from "@mui/material/Typography";
import {
  baseUrl,
  currencyFormater,
  formatErrorMessage,
  formatSuccessMessage,
  FULL_DATE_FORMAT,
  GLOBAL_COLORS,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import { OrderItemType, OrderType } from "src/types/orders";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import dayjs from "dayjs";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";
import axios from "axios";
import toast from "react-hot-toast";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "src/store/authStore";

type Props = {
  selectedOrder: OrderType;
};

const headCells = [
  "S/N",
  "Image",
  "Title",
  "Price",
  "Discount Price",
  "Dropped Status",
  "Vendor",
];
const tableCellStyles = { fontSize: "13px" };
function ProductInformation({ selectedOrder }: Props) {
  const [openConfirmDropedDialog, setOpenConfirmDropedDialog] = useState(false);
  const [selected, setSelected] = useState<OrderItemType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile } = useAuthStore();
  const queryClient = useQueryClient();

  const handleCloseConfirmDrop = () => {
    setSelected(null);
    setOpenConfirmDropedDialog(true);
  };
  const handleOpenConfirmDrop = (val: OrderItemType) => {
    setSelected(val);
    setOpenConfirmDropedDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const payload = {
        order_item_ids: [selected?.id],
      };
      const res = await axios.post(
        `${baseUrl}/agents/order-items/confirm-drop`,
        payload
      );
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);

      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ORDER],
      });
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "16px",
      }}
    >
      {openConfirmDropedDialog && selected ? (
        <GeneralConfirmDialog
          hint={`Confirm this item (${selected?.product?.name}) has been recieved by you, quantity is ${selected?.quantity}`}
          open={openConfirmDropedDialog}
          handleClose={handleCloseConfirmDrop}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Box>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 0.6, ml: 1 }}>
          Ordered Items
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {headCells.map((item) => (
                  <TableCell key={item} component="th">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder?.order_items?.map((row, idx) => (
                <TableRow key={row?.id}>
                  <TableCell sx={tableCellStyles}>{idx + 1}</TableCell>
                  <TableCell>
                    <Box>
                      <img
                        src={row?.product?.media[0]?.original_url || Logo}
                        alt={"Product"}
                        style={{
                          width: "42px",
                          height: "42px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    {row?.product?.name}
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    &#8358;{currencyFormater(row?.product?.price, 2)}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    &#8358;{currencyFormater(row?.product?.discounted_price, 2)}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    <Box>
                      {renderStatus(row?.handoff_status)}
                      {row?.handoff_confirmed_at &&
                      row?.handoff_status == "dropped" ? (
                        <Typography sx={{ fontSize: "11px" }}>
                          Confirmed at{" "}
                          {dayjs(row?.handoff_confirmed_at).format(
                            FULL_DATE_FORMAT
                          )}
                        </Typography>
                      ) : row?.handoff_status == "dropped" &&
                        !row?.handoff_confirmed_at &&
                        profile?.role !== "admin" ? (
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ fontSize: "10.2px", px: 0.6, py: 0.2 }}
                          onClick={() => {
                            handleOpenConfirmDrop(row);
                          }}
                        >
                          Confirm drop
                        </Button>
                      ) : null}
                    </Box>
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    {row?.product?.vendor?.business_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
export default ProductInformation;
