import { Dispatch, Fragment, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import {
  baseUrl,
  FILTER_DATE_FORMAT,
  formatErrorMessage,
  formatSuccessMessage,
  setDefaultHeaders,
  tableMenuStyles,
} from "src/utils";
import toast from "react-hot-toast";
import axios from "axios";

import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { fetchSettingDiscounts } from "src/services/settings";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import dayjs from "dayjs";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import { SettingsDiscountType } from "src/types/settings";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";

const headCells = [
  "Name",
  "Rate(%)",
  "Start Date",
  "End Date",
  "Status",
  "Overide Vendor Discount",
  "Actions",
];

type Props = {
  handleOpenEditDiscount: (val: SettingsDiscountType) => void;
  selectedDiscount: SettingsDiscountType | null;
  setSelectedDiscount: Dispatch<SetStateAction<SettingsDiscountType | null>>;
};
function ManageDiscounts({
  selectedDiscount,
  handleOpenEditDiscount,
  setSelectedDiscount,
}: Props) {
  const [openDelete, setOpenDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const { isError, error, isLoading, data } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS_DISCOUNTS, {}],
    queryFn: () => fetchSettingDiscounts({ limit: 1000, page: 1 }),
  });

  const handleOpenDeleteDialog = (val: SettingsDiscountType) => {
    setSelectedDiscount(val);
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setSelectedDiscount(null);
    setOpenDelete(false);
  };
  const handleSubmitDelete = async () => {
    setDefaultHeaders();

    try {
      setIsSubmitting(true);
      const res = await axios.delete(
        `${baseUrl}/admin/category-discounts/${selectedDiscount?.id}`
      );

      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS_DISCOUNTS],
      });
      toast.success(formatSuccessMessage(res?.data));
      handleCloseDeleteDialog();
    } catch (error) {
      let errMsg = formatErrorMessage(error);

      return toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isLoading) {
    return <HalfScreenLoader />;
  }
  console.log("vvvvvvvvvvv", data);
  return (
    <Box sx={{ my: 1 }}>
      {openDelete && selectedDiscount && (
        <GeneralConfirmDialog
          hint={`Do you really want to delete this (${selectedDiscount?.name}) discount?`}
          open={openDelete}
          isSubmitting={isSubmitting}
          handleClose={handleCloseDeleteDialog}
          handleSubmit={handleSubmitDelete}
        />
      )}
      <Box>
        {data && data?.total > 0 ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <StyledTableRow>
                  {headCells.map((item) => (
                    <StyledTableCell key={item}>{item}</StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.data?.length > 0 &&
                  data?.data?.map((row) => (
                    <StyledTableRow key={row?.id}>
                      <StyledTableCell>{row?.name}</StyledTableCell>
                      <StyledTableCell>{row?.rate}</StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row?.start_date).format(FILTER_DATE_FORMAT)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row?.end_date).format(FILTER_DATE_FORMAT)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {renderStatus(row?.is_active)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row?.override_vendor_discount ? "Yes" : "No"}
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
                                    handleOpenEditDiscount(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Edit discount
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleOpenDeleteDialog(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Delete discount
                                </MenuItem>
                              </Menu>
                            </Fragment>
                          )}
                        </PopupState>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <EmptyTable subText="No discount created yet" />
        )}
      </Box>
    </Box>
  );
}
export default ManageDiscounts;
