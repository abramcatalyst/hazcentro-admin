import { Fragment, useState } from "react";
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
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  rowsPerPageOptions,
  setDefaultHeaders,
  sLimit,
  sPage,
  tableMenuStyles,
} from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { useSearchParams } from "react-router-dom";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { BannerType } from "src/types/banners";
import BannerDetailsDialog from "./BannerDetailsDialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";

dayjs.extend(advancedFormat);

const headCells = ["Image", "Type", "Date Created", "Order", "Action"];

type Props = {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data:
    | {
        data: BannerType[];
        current_page: number;
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        lings: {
          url: null | string;
          label: string;
          active: boolean;
        }[];
        next_page: number;
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url: null | string;
        to: number;
        total: number;
      }
    | undefined;
  queryKey: string;
  handleOpenEditDialog: (val: BannerType) => void;
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

function BannersTable({
  data,
  isError,
  isPending,
  error,
  queryKey,
  handleOpenEditDialog,
}: Props) {
  const [openPreviewProfile, setOpenPreviewProfile] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState<BannerType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const queryClient = useQueryClient();
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

  const handleOpenPreviewProfile = (info: BannerType) => {
    setSelected(info);
    setOpenPreviewProfile(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreviewProfile(false);
    setSelected(null);
  };

  const handleOpenDeleteDialog = (info: BannerType) => {
    setSelected(info);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelected(null);
  };
  const handleSubmitDelete = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const res = await axios.delete(
        `${baseUrl}/admin/banners/${selected?.id}`
      );

      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
      handleCloseDeleteDialog();
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending || !data) {
    return <HalfScreenLoader />;
  }

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreviewProfile && selected && (
        <BannerDetailsDialog
          open={openPreviewProfile}
          selected={selected}
          handleClose={handleClosePreviewProfile}
        />
      )}
      {openDeleteDialog && selected && (
        <GeneralConfirmDialog
          open={openDeleteDialog}
          isSubmitting={isSubmitting}
          hint={`Kindly confirm to delete this banner`}
          handleClose={handleClosePreviewProfile}
          handleSubmit={handleSubmitDelete}
        />
      )}

      <TableContainer>
        {data?.total > 0 ? (
          <Box>
            <Table sx={{ minWidth: 750 }} size={"small"}>
              <EnhancedTableHead

              //   onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {data?.data?.map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row?.id}
                      // selected={isItemSelected}
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
                              setSelectedUsers((prev) =>
                                new Set(prev).add(index)
                              );
                            }
                          }}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </StyledTableCell> */}
                      <StyledTableCell>
                        <Box>
                          <img
                            src={row?.image_url}
                            alt=""
                            style={{
                              objectFit: "contain",
                              width: "90px",
                              height: "30px",
                            }}
                          />
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>{row?.link_type}</StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row?.created_at).format("MMM Do YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>{row?.order}</StyledTableCell>

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
                                  Preview banner
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleOpenEditDialog(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Edit banner
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleOpenDeleteDialog(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Delete banner
                                </MenuItem>

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
          <EmptyTable isSmall subText="No banners found" />
        )}
      </TableContainer>
    </Box>
  );
}

export default BannersTable;
