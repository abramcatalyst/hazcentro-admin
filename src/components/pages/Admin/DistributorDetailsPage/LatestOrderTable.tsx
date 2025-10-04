import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { currencyFormater, FULL_DATE_FORMAT } from "src/utils";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import dayjs from "dayjs";
import { VendorOverviewType } from "src/types/vendor";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE_LINKS, CUSTOMER_ROUTE_LINKS } from "src/utils/routeLinks";
import useAuthStore from "src/store/authStore";

const headCells = ["Order ID", "Item", "Amount", "Date", "Status", ""];

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
  vendorOverviewData: VendorOverviewType;
};
const LatestOrderTable = ({ vendorOverviewData }: Props) => {
  const { profile } = useAuthStore((state) => state);
  return (
    <Box sx={{ background: "#ffffff", borderRadius: "20px", mb: 1 }}>
      <Box sx={{ p: 1, pl: 2 }}>
        <Typography sx={{ my: 1.4, fontWeight: 600 }}>Latest Order</Typography>
      </Box>
      <TableContainer>
        {vendorOverviewData && vendorOverviewData?.latest_orders?.length > 0 ? (
          <Table sx={{ minWidth: 300 }} size={"small"}>
            <EnhancedTableHead />
            <TableBody>
              {vendorOverviewData?.latest_orders
                ?.slice(0, 10)
                ?.map((row, index) => {
                  return (
                    <TableRow key={`${row?.id}${index}`} hover>
                      <StyledTableCell sx={{ fontSize: "11px" }}>
                        <Link
                          to={
                            profile?.role === "admin"
                              ? `${ADMIN_ROUTE_LINKS.ADMIN_ORDER_DETAILS}/${row?.id}`
                              : `${CUSTOMER_ROUTE_LINKS.CUSTOMER_ORDER_DETAILS}/${row?.id}`
                          }
                        >
                          {row?.tracking_id}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography
                          noWrap
                          variant="subtitle2"
                          sx={{ fontSize: "11px" }}
                        >
                          {row?.items[0]?.product_name}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: "11px" }}>
                        &#8358;{currencyFormater(row?.total_price, 2)}
                      </StyledTableCell>
                      <StyledTableCell sx={{ fontSize: "11px" }}>
                        {dayjs(row?.created_at).format(FULL_DATE_FORMAT)}
                      </StyledTableCell>

                      <StyledTableCell sx={{ fontSize: "11px" }}>
                        {renderStatus(row?.status)}
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton size="small" sx={{ fontSize: "11px" }}>
                          <KeyboardArrowRightRoundedIcon />
                        </IconButton>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        ) : (
          <EmptyTable subText="No Recent Orders" />
        )}
      </TableContainer>
    </Box>
  );
};

export default LatestOrderTable;
