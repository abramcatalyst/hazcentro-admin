import { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import dayjs from "dayjs";
import { currencyFormater, FULL_DATE_FORMAT } from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import OrderPreviewDialog from "src/components/pages/Admin/OrderManagement/OrderPreviewDialog/OrderPreviewDialog";
import { OrderType } from "src/types/orders";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

const headCells = [
  "Date Created",
  "Tracking ID",
  "Amount",
  "No. of Items",
  "Assigned Agent",
  "Status",
  "Payment Reference",
  "Payment Status",
  // "Action",
];

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

type Props = {
  data: OrderType[];
  pagination: {
    current_page: number;
    last_page: number;
    next_page: number;
    per_page: number;
    total: number;
  };
};
function OrdersTable({ data }: Props) {
  const [openPreview, setOpenPreview] = useState(false);

  // const handleOpenPreview = () => {
  //   setOpenPreview(true);
  // };
  const handleClosePreviewProfile = () => {
    setOpenPreview(false);
  };
  console.log(openPreview, handleClosePreviewProfile, OrderPreviewDialog);

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {/* {openPreview && (
        <OrderPreviewDialog
          open={openPreview}
          handleClose={handleClosePreviewProfile}
        />
      )} */}

      <TableContainer>
        {data?.length === 0 ? (
          <EmptyTable subText="No data found" />
        ) : (
          <Table sx={{ minWidth: 350 }} size={"small"}>
            <EnhancedTableHead

            //   onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {data?.map((row) => {
                return (
                  <StyledTableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row?.id}
                    sx={{}}
                  >
                    <StyledTableCell>
                      {dayjs(row?.created_at).format(FULL_DATE_FORMAT)}
                    </StyledTableCell>
                    <StyledTableCell>{row?.tracking_id}</StyledTableCell>
                    <StyledTableCell>
                      &#8358;{currencyFormater(row?.total_price)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row?.order_items?.length}
                    </StyledTableCell>

                    <StyledTableCell>
                      {row?.agent?.name || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>
                      {renderStatus(row?.status)}
                    </StyledTableCell>
                    <StyledTableCell>{row?.payment_reference}</StyledTableCell>

                    <StyledTableCell>
                      {renderStatus(row?.payment_status)}
                    </StyledTableCell>
                    {/* <StyledTableCell>
                      <PopupState variant="popover">
                        {(popupState) => (
                          <Fragment>
                            <IconButton {...bindTrigger(popupState)}>
                              <MoreHorizRoundedIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem
                                onClick={() => {
                                  handleOpenPreview();
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
                    </StyledTableCell> */}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}

export default OrdersTable;
