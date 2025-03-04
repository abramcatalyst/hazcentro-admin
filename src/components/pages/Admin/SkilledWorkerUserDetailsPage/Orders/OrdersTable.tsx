import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
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
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import dayjs from "dayjs";
import { currencyFormater, tableMenuStyles } from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import OrderPreviewDialog from "src/components/pages/Admin/OrderManagement/OrderPreviewDialog/OrderPreviewDialog";

const headCells = [
  "Order ID",
  "Order Name",
  "Amount",
  "Date Created",
  "Buyer Name",
  "Merchant Name",
  "Category",
  "Status",
  "Action",
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

function OrdersTable() {
  const [openPreview, setOpenPreview] = useState(false);

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreview(false);
  };
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreview && (
        <OrderPreviewDialog
          open={openPreview}
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
            {[1, 2, 3, 4, 5, 6, 7].map((row) => {
              return (
                <StyledTableRow
                  hover
                  // onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row}
                  sx={{}}
                >
                  <StyledTableCell>#YW627J</StyledTableCell>
                  <StyledTableCell>{"Jerry WIlson"}</StyledTableCell>
                  <StyledTableCell>
                    &#8358;{currencyFormater(40000)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs().format("MMM ddo YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>{"Kerry Wilson"}</StyledTableCell>

                  <StyledTableCell>{"Oriano, Nigeria"}</StyledTableCell>
                  <StyledTableCell>
                    <Chip size="small" label="Electronic" />
                  </StyledTableCell>
                  <StyledTableCell>{renderStatus("success")}</StyledTableCell>
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
