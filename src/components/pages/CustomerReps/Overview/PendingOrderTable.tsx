import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { currencyFormater } from "src/utils";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import renderStatus from "src/components/shared/RenderStatus/renderStatus";

dayjs.extend(advancedFormat);

const headCells = [
  "Order ID",
  "Item",
  "Amount",
  "Date Created",
  "Buyer Name",
  "Mechant Name",
  "Category",
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

function PendingOrderTable() {
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
        <Table sx={{ minWidth: 300 }} size={"small"}>
          <EnhancedTableHead />
          <TableBody>
            {[1, 2, 3, 4, 5, 6].map((row) => {
              return (
                <TableRow key={row}>
                  <StyledTableCell>#YW627J</StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2" noWrap>
                      {"iPhone 16 Pro | 256GB 6GB RAM"}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    {" "}
                    &#8358;{currencyFormater(780000)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs().format("MMM Do `YY")}
                  </StyledTableCell>
                  <StyledTableCell>John Doeing</StyledTableCell>
                  <StyledTableCell>Oriano inc</StyledTableCell>
                  <StyledTableCell>Electronics</StyledTableCell>
                  <StyledTableCell>{renderStatus("pending")}</StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PendingOrderTable;
