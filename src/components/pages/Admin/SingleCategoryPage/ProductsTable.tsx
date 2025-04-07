import { Dispatch, Fragment, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
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
import ProductDetailsDialog from "./ProductDetailsDialog";
// import DistributorProfileDialog from "../DistributorProfileDialog/DistributorProfileDialog";
import ProductImg from "src/assets/images/logo.png";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import { SingleCategoryType } from "src/types/categories";

dayjs.extend(advancedFormat);

const headCells = [
  "Image",
  "Name",
  "Price",
  "Warranty",
  "Created On",
  "Business Name",
  "Action",
];

type Props = {
  data: SingleCategoryType;
  selectedUsers: Set<number>;
  setSelectedUsers: Dispatch<SetStateAction<Set<number>>>;
};
function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="warning"

            onChange={onSelectAllClick}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell key={headCell}>{headCell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function ProductsTable({ data }: Props) {
  const [openPreviewProfile, setOpenPreviewProfile] = useState(false);

  const handleOpenPreviewProfile = () => {
    setOpenPreviewProfile(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreviewProfile(false);
  };
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreviewProfile && (
        <ProductDetailsDialog
          open={openPreviewProfile}
          handleClose={handleClosePreviewProfile}
        />
      )}
      {/* {openPreviewProfile && (
        <DistributorProfileDialog
          open={openPreviewProfile}
          handleClose={handleClosePreviewProfile}
        />
      )} */}

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
            {data?.products?.data?.map((row) => {
              return (
                <StyledTableRow
                  hover
                  // onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row?.id}
                  // sx={{
                  //   cursor: "pointer",
                  //   background: isItemSelected
                  //     ? GLOBAL_COLORS.YELLOW_500
                  //     : "default",
                  // }}
                >
                  {/* <StyledTableCell padding="checkbox">
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
                  </StyledTableCell> */}
                  <StyledTableCell>
                    <img
                      src={row?.media[0]?.original_url || ProductImg}
                      alt="product"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row?.name}</StyledTableCell>
                  <StyledTableCell>
                    &#8358;{currencyFormater(row?.price, 2)}
                  </StyledTableCell>
                  <StyledTableCell>{row?.warranty}</StyledTableCell>
                  <StyledTableCell>
                    {dayjs(row?.created_at).format("MMM Do YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {row?.vendor?.business_name}
                  </StyledTableCell>
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
                                handleOpenPreviewProfile();
                                popupState.close();
                              }}
                              sx={tableMenuStyles}
                            >
                              Preview Product
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                // handleOpenTransactionPreview(row);
                                popupState.close();
                              }}
                              sx={tableMenuStyles}
                            >
                              Activate
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

export default ProductsTable;
