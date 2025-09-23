import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import {
  baseUrl,
  currencyFormater,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  rowsPerPageOptions,
  setDefaultHeaders,
  sLimit,
  sPage,
  tableMenuStyles,
} from "src/utils";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import { Fragment, memo, useState } from "react";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
// import OrderPreviewDialog from "../OrderManagement/OrderPreviewDialog/OrderPreviewDialog";
import { fetchPendingPayouts } from "src/services/escrow";
import { PendingPayoutType } from "src/types/payout";
import axios from "axios";
import toast from "react-hot-toast";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";
import PreviewPendingPayoutDialog from "./PreviewPendingPayoutDialog";

const headCells = ["User ", "Amount", "Description", "Status", "Actions"];

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

const PendingPayoutsTable = () => {
  const [openPreview, setOpenPreview] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [selected, setSelected] = useState<PendingPayoutType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenPreview = (item: PendingPayoutType) => {
    setSelected(item);
    setOpenPreview(true);
  };
  const handleOpenApprove = (item: PendingPayoutType) => {
    setSelected(item);
    setOpenApprove(true);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
    setSelected(null);
  };
  const handleCloseApprove = () => {
    setOpenApprove(false);
    setSelected(null);
  };

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;
  const queryClient = useQueryClient();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_PENDING_PAYOUTS,
      { limit, page, id },
    ],
    queryFn: () =>
      fetchPendingPayouts({
        limit: limit,
        page,
        userId: id,
      }),
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

  const handleSubmit = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const payload = {
        is_active: true,
      };
      const res = await axios.post(
        `${baseUrl}/admin/wallets/withdrawals/${selected?.id}/approve`,
        payload
      );
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);

      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_PENDING_PAYOUTS],
      });
      handleCloseApprove();
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
  if (isPending) {
    return <HalfScreenLoader />;
  }
  return (
    <Box sx={{ background: "#ffffff", p: 1, borderRadius: "20px", mb: 1 }}>
      {openPreview && selected && (
        <PreviewPendingPayoutDialog
          open={openPreview}
          selected={selected}
          handleClose={handleClosePreview}
        />
      )}
      {openApprove && selected ? (
        <GeneralConfirmDialog
          open={openApprove}
          hint={`Confirm to approve this payout for ${
            selected?.wallet?.user?.name
          } of amount NGN${currencyFormater(selected?.amount)}`}
          isSubmitting={isSubmitting}
          handleClose={handleCloseApprove}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <Typography variant="h6" sx={{ pl: 1, fontWeight: 600, mb: 1 }}>
        Pending Payouts
      </Typography>
      <TableContainer>
        {data?.data?.length === 0 ? (
          <EmptyTable subText="No pending payouts found" />
        ) : (
          <Table sx={{ minWidth: 650 }} size={"small"}>
            <EnhancedTableHead />
            <TableBody>
              {data?.data?.map((row) => {
                return (
                  <TableRow key={row?.id}>
                    <StyledTableCell sx={{ minWidth: "120px" }}>
                      {row?.wallet?.user?.name || "N/A"}
                    </StyledTableCell>
                    <StyledTableCell>
                      &#8358;{currencyFormater(row?.amount)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography sx={{ fontSize: "13px" }}>
                        {row?.description}{" "}
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell>
                      {renderStatus(row?.status)}
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
                                  handleOpenPreview(row);
                                  popupState.close();
                                }}
                                sx={tableMenuStyles}
                              >
                                Preview payout
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleOpenApprove(row);
                                  popupState.close();
                                }}
                                sx={tableMenuStyles}
                              >
                                Approve payout
                              </MenuItem>
                            </Menu>
                          </Fragment>
                        )}
                      </PopupState>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
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
  );
};

export default memo(PendingPayoutsTable);
