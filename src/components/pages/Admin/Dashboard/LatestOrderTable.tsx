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
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchOrders } from "src/services/orders";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";

dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
const headCells = [
  "Tracking ID",
  "Buyer Name",
  "Number of Items",
  "Amount",
  "Date Created",
  "Status",
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

function LatestOrderTable() {
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_RECENT_ORDERS, {}],
    queryFn: () => fetchOrders({ limit: 8, page: 1 }),
  });

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
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
        <Typography sx={{ fontWeight: 500 }}>Latest Orders</Typography>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 300 }} size={"small"}>
          <EnhancedTableHead />
          <TableBody>
            {data?.data.map((row) => {
              return (
                <TableRow key={row.id}>
                  <StyledTableCell>{row?.tracking_id}</StyledTableCell>
                  <StyledTableCell>{row?.buyer?.name || "N/A"}</StyledTableCell>
                  <StyledTableCell>{row?.order_items?.length}</StyledTableCell>
                  <StyledTableCell>
                    &#8358;{currencyFormater(row?.total_price, 2)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs(row?.created_at).format("MMM Do `YY")}
                  </StyledTableCell>
                  <StyledTableCell>{renderStatus(row?.status)}</StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default LatestOrderTable;
