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
  currencyFormater,
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
  tableMenuStyles,
} from "src/utils";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import { Fragment, memo, useState } from "react";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { fetchAgentAssignedOrders } from "src/services/orders";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import OrderPreviewDialog from "../OrderManagement/OrderPreviewDialog/OrderPreviewDialog";
import { OrderType } from "src/types/orders";

const headCells = ["Buyer ", "Product Detail", "Amount", "Status", "Actions"];

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
  selectedTab: string;
};
const AssignmentsTable = ({ selectedTab }: Props) => {
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
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_ASSIGNED_ORDERS,
      { limit, page, id, selectedTab },
    ],
    queryFn: () =>
      fetchAgentAssignedOrders({
        limit: limit,
        page,
        userId: id,
        status: selectedTab,
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

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }

  return (
    <Box sx={{ background: "#ffffff", p: 1, borderRadius: "20px", mb: 1 }}>
      {openPreview && selectedOrder && (
        <OrderPreviewDialog
          open={openPreview}
          selectedOrder={selectedOrder}
          handleClose={handleClosePreviewProfile}
        />
      )}

      <TableContainer>
        {data?.data?.length === 0 ? (
          <EmptyTable subText="No orders found" />
        ) : (
          <Table sx={{ minWidth: 650 }} size={"small"}>
            <EnhancedTableHead />
            <TableBody>
              {data?.data?.map((row) => {
                return (
                  <TableRow key={row?.id}>
                    <StyledTableCell sx={{ minWidth: "120px" }}>
                      {row?.buyer?.name || "N/A"}
                    </StyledTableCell>

                    <StyledTableCell>
                      <Typography sx={{ fontSize: "13px" }}>
                        {row?.order_items?.length}{" "}
                        {row?.order_items?.length > 1 ? "items" : "item"}{" "}
                        ordered
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      &#8358;{currencyFormater(row?.total_price)}
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
                                Preview Order
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
          count={data?.pagination?.total || 0}
          rowsPerPage={limit || rowsPerPageOptions[0]}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default memo(AssignmentsTable);
