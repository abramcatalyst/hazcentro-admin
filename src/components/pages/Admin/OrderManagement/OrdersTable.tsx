import { Dispatch, Fragment, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
// import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import Checkbox from "@mui/material/Checkbox";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { currencyFormater, GLOBAL_COLORS, tableMenuStyles } from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import OrderPreviewDialog from "./OrderPreviewDialog/OrderPreviewDialog";
import { OrderType } from "src/types/orders";
// import UserProfileDialog from "../UserProfileDialog/UserProfileDialog";
// import DistributorProfileDialog from "../DistributorProfileDialog/DistributorProfileDialog";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
const headCells = [
  "Tracking ID",
  "Number of Items",
  "Amount",
  "Date Created",
  "Buyer Name",
  // "Merchant Name",
  // "Category",
  "Status",
  "Action",
];

type Props = {
  selectedUsers: Set<number>;
  setSelectedUsers: Dispatch<SetStateAction<Set<number>>>;
  data: OrderType[];
};
function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell}>{headCell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrdersTable({ selectedUsers, data }: Props) {
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const handleOpenPreview = (item: OrderType) => {
    setSelectedOrder(item);
    setOpenPreview(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreview(false);
    setSelectedOrder(null);
  };
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreview && selectedOrder && (
        <OrderPreviewDialog
          open={openPreview}
          selectedOrder={selectedOrder}
          handleClose={handleClosePreviewProfile}
        />
      )}

      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <EnhancedTableHead

          //   onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>
            {data?.map((row, index) => {
              const isItemSelected = selectedUsers.has(index);

              return (
                <StyledTableRow
                  hover
                  // onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row?.id}
                  selected={isItemSelected}
                  sx={{
                    cursor: "pointer",
                    background: isItemSelected
                      ? GLOBAL_COLORS.YELLOW_500
                      : "default",
                  }}
                >
                  <StyledTableCell>{row?.tracking_id}</StyledTableCell>
                  <StyledTableCell>{row?.order_items?.length}</StyledTableCell>
                  <StyledTableCell>
                    &#8358;{currencyFormater(row?.total_price, 2)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs(row?.created_at).format("MMM do YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>{row?.buyer?.name}</StyledTableCell>

                  {/* <StyledTableCell>{row?.user?.name}</StyledTableCell> */}

                  {/* <StyledTableCell>
                    <Chip size="small" label="Electronic" />
                  </StyledTableCell> */}
                  <StyledTableCell>{renderStatus(row?.status)}</StyledTableCell>
                  <StyledTableCell>
                    <PopupState variant="popover">
                      {(popupState) => (
                        <Fragment>
                          <IconButton {...bindTrigger(popupState)}>
                            <MoreHorizRoundedIcon />
                          </IconButton>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem
                              onClick={() => {
                                handleOpenPreview(row);
                                popupState.close();
                              }}
                              sx={tableMenuStyles}
                            >
                              Preview Order
                            </MenuItem>
                          </Menu>
                        </Fragment>
                      )}
                    </PopupState>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrdersTable;
