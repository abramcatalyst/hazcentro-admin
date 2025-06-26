import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { currencyFormater } from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import { VendorEscrowOrderType } from "src/types/orders";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

const headCells = [
  "Order ID",
  "Order Name",
  "Amount",
  "Date Created",
  "Status",
];

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
  data: VendorEscrowOrderType[];
};
function OrdersTable({ data }: Props) {
  return (
    <Box sx={{ width: "100%", my: 1.5 }}>
      <TableContainer>
        {data?.length > 0 ? (
          <Table sx={{ minWidth: 350 }} size={"small"}>
            <EnhancedTableHead />
            <TableBody>
              {data?.map((row) => {
                return (
                  <StyledTableRow tabIndex={-1} key={row?.order_id} sx={{}}>
                    <StyledTableCell>{row?.order_id}</StyledTableCell>
                    <StyledTableCell>{row?.item}</StyledTableCell>
                    <StyledTableCell>
                      &#8358;{currencyFormater(row?.amount, 2)}
                    </StyledTableCell>
                    <StyledTableCell>{row?.date}</StyledTableCell>
                    <StyledTableCell>
                      {renderStatus(row?.status)}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <EmptyTable subText="No record found" />
        )}
      </TableContainer>
    </Box>
  );
}

export default OrdersTable;
