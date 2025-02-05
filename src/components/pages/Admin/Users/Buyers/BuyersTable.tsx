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
import Checkbox from "@mui/material/Checkbox";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import dayjs from "dayjs";
import {
  formatErrorMessage,
  GLOBAL_COLORS,
  rowsPerPageOptions,
  sLimit,
  sPage,
  tableMenuStyles,
} from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import UserProfileDialog from "../UserProfileDialog/UserProfileDialog";
// import DistributorProfileDialog from "../DistributorProfileDialog/DistributorProfileDialog";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { fetchUsers } from "src/services/users";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

dayjs.extend(advancedFormat);

const headCells = [
  "User ID",
  "Customer Name",
  "Location",
  "Date Joined",
  "Email Address",
  "Last Activities",
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

function BuyersTable({ selectedUsers, setSelectedUsers }: Props) {
  const [openPreviewProfile, setOpenPreviewProfile] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_BUYERS, { limit, page }],
    queryFn: () => fetchUsers({ limit: limit, page: page }),
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams(
      (params) => {
        params.set(sPage, `${newPage + 1}`);
        return params;
      },
      { replace: true }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "1");
        return params;
      },
      { replace: true }
    );
  };

  console.log("", handleChangePage, handleChangeRowsPerPage);

  const handleOpenPreviewProfile = () => {
    setOpenPreviewProfile(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreviewProfile(false);
  };
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreviewProfile && (
        <UserProfileDialog
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
        {data?.total > 0 ? (
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead

            //   onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {data?.data?.map((row, index) => {
                const isItemSelected = selectedUsers.has(index);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
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
                            setSelectedUsers((prev) =>
                              new Set(prev).add(index)
                            );
                          }
                        }}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row?.id}</StyledTableCell>
                    <StyledTableCell>{row?.name}</StyledTableCell>
                    <StyledTableCell>{`${row?.state}, ${row?.country}`}</StyledTableCell>
                    <StyledTableCell>
                      {dayjs(row?.created_at).format("MMM Do YYYY")}
                    </StyledTableCell>
                    <StyledTableCell>{row?.email}</StyledTableCell>
                    <StyledTableCell>{"2 days ago"}</StyledTableCell>
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
                                Preview Profile
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

                              <MenuItem
                                onClick={() => {
                                  // handleOpenTransactionPreview(row);
                                  popupState.close();
                                }}
                                sx={tableMenuStyles}
                              >
                                Suspend
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  // handleOpenTransactionPreview(row);
                                  popupState.close();
                                }}
                                sx={tableMenuStyles}
                              >
                                Block
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
        ) : (
          <EmptyTable isSmall subText="No user found" />
        )}
      </TableContainer>
    </Box>
  );
}

export default BuyersTable;
