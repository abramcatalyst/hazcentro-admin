import { Dispatch, Fragment, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
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
import { UserType } from "src/types/users";

dayjs.extend(advancedFormat);

const headCells = [
  "User ID",
  "Customer Name",
  "Location",
  "Date Joined",
  "Email Address",
  "Phone Number",
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
        {headCells.map((headCell) => (
          <TableCell key={headCell}>{headCell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function ServiceWorkersTable({ selectedUsers }: Props) {
  const [openPreviewProfile, setOpenPreviewProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_ALl_WORKERS, { limit, page }],
    queryFn: () => fetchUsers({ limit: limit, page: page, role: "worker" }),
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

  const handleOpenPreviewProfile = (info: UserType) => {
    setSelectedUser(info);
    setOpenPreviewProfile(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreviewProfile(false);
    setSelectedUser(null);
  };
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreviewProfile && selectedUser && (
        <UserProfileDialog
          open={openPreviewProfile}
          selectedUser={selectedUser}
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
          <Box>
            <Table sx={{ minWidth: 750 }} size={"small"}>
              <EnhancedTableHead

              //   onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {data?.data?.map((row, index) => {
                  const isItemSelected = selectedUsers.has(index);

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
                      <StyledTableCell>{row?.unique_user_id}</StyledTableCell>
                      <StyledTableCell>{row?.name}</StyledTableCell>
                      <StyledTableCell>{`${row?.state}, ${row?.country}`}</StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row?.created_at).format("MMM Do YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>{row?.email}</StyledTableCell>
                      <StyledTableCell>{row?.phone_number}</StyledTableCell>
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
                                    handleOpenPreviewProfile(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Preview Profile
                                </MenuItem>
                                {/* <MenuItem
                                onClick={() => {
                                  popupState.close();
                                }}
                                sx={tableMenuStyles}
                              >
                                Activate
                              </MenuItem> */}

                                {/* <MenuItem
                                onClick={() => {
                                  popupState.close();
                                }}
                                sx={tableMenuStyles}
                              >
                                Suspend
                              </MenuItem> */}
                                {/* <MenuItem
                                onClick={() => {
                                  popupState.close();
                                }}
                                sx={tableMenuStyles}
                              >
                                Block
                              </MenuItem> */}
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
            <Box sx={{ my: 1 }}>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data?.total || 0}
                rowsPerPage={limit || rowsPerPageOptions[0]}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        ) : (
          <EmptyTable isSmall subText="No user found" />
        )}
      </TableContainer>
    </Box>
  );
}

export default ServiceWorkersTable;
