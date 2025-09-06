import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { currencyFormater, formatErrorMessage } from "src/utils";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQuery } from "@tanstack/react-query";
import { fetchCustomerCarePendingOrders } from "src/services/orders";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import TableSkeletonLoader from "src/components/shared/TableSkeletonLoader/TableSkeletonLoader";

dayjs.extend(advancedFormat);

const headCells = [
  "Order ID",
  "Amount",
  "Date Created",
  "Buyer Name",
  // "Mechant Name",
  // "Category",
  "Payment Status",
  "Handoff Status",
];

function EnhancedTableHead() {
  return (
    <TableHead sx={{ background: "#F4F5F7" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell}>{headCell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function PendingOrderTable() {
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_CUSTOMER_CARE_ORDERS, {}],
    queryFn: () => fetchCustomerCarePendingOrders({}),
  });

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <TableSkeletonLoader />;
  }
  return (
    <Box
      sx={{
        width: "100%",
        my: 1,
        background: "#ffffff",
        borderRadius: "16px",
        p: 1,
      }}
    >
      <Box mb={2} pl={1}>
        <Typography sx={{ fontWeight: 500 }}>Pending Orders</Typography>
      </Box>
      <TableContainer>
        {data && data?.total > 0 ? (
          <Table sx={{ minWidth: 300 }} size={"small"}>
            <EnhancedTableHead />
            <TableBody>
              {data?.data?.map((row) => {
                return (
                  <TableRow key={row?.id}>
                    <StyledTableCell>{row?.tracking_id}</StyledTableCell>

                    <StyledTableCell>
                      {" "}
                      &#8358;{currencyFormater(row?.total_price)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {dayjs(row?.created_at).format("MMM Do `YY")}
                    </StyledTableCell>
                    <StyledTableCell>{row?.user?.name}</StyledTableCell>
                    {/* <StyledTableCell>Oriano inc</StyledTableCell>
                    <StyledTableCell>Electronics</StyledTableCell> */}
                    <StyledTableCell>
                      {renderStatus(row?.payment_status)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {renderStatus(row?.handoff_status)}
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <EmptyTable subText="No pending orders" />
        )}
      </TableContainer>
    </Box>
  );
}

export default PendingOrderTable;
