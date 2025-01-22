import { Dispatch, Fragment, SetStateAction, useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import dayjs from "dayjs";
import { currencyFormater, GLOBAL_COLORS, tableMenuStyles } from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import OrderPreviewDialog from "./OrderPreviewDialog/OrderPreviewDialog";
// import UserProfileDialog from "../UserProfileDialog/UserProfileDialog";
// import DistributorProfileDialog from "../DistributorProfileDialog/DistributorProfileDialog";

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

type Props = {
  selectedUsers: Set<number>;
  setSelectedUsers: Dispatch<SetStateAction<Set<number>>>;
};
function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="warning"

            // onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell}>{headCell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrdersTable({ selectedUsers, setSelectedUsers }: Props) {
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
            {[1, 2, 3, 4, 5, 6, 7].map((row, index) => {
              const isItemSelected = selectedUsers.has(index);
              const labelId = `enhanced-table-${index}`;

              return (
                <StyledTableRow
                  hover
                  // onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row}
                  selected={isItemSelected}
                  sx={{
                    cursor: "pointer",
                    background: isItemSelected
                      ? GLOBAL_COLORS.YELLOW_500
                      : "default",
                  }}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      color="warning"
                      size="small"
                      checked={isItemSelected}
                      onChange={() => {
                        if (selectedUsers.has(index)) {
                          setSelectedUsers((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(index);
                            return newSet;
                          });
                        } else {
                          setSelectedUsers((prev) => new Set(prev).add(index));
                        }
                      }}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>#YW627J</StyledTableCell>
                  <StyledTableCell>{"Jerry WIlson"}</StyledTableCell>
                  <StyledTableCell>
                    &#8358;{currencyFormater(40000)}
                  </StyledTableCell>
                  <StyledTableCell>{dayjs().format("MMM ddo")}</StyledTableCell>
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
