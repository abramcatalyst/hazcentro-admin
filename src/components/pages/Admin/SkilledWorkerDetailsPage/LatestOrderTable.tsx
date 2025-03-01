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

const LatestOrderTable = () => {
  return (
    <Box sx={{ background: "#ffffff", borderRadius: "20px", mb: 1 }}>
      <Box sx={{ p: 1, pl: 2 }}>
        <Typography sx={{ my: 1.4, fontWeight: 600 }}>Latest Order</Typography>
      </Box>
      <TableContainer>
        <Table
          sx={{ minWidth: 300 }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <EnhancedTableHead />
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7].map((row, index) => {
              return (
                <TableRow key={`${row}${index}`} hover>
                  <StyledTableCell sx={{ fontSize: "11px" }}>
                    #YTVFR
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      noWrap
                      variant="subtitle2"
                      sx={{ fontSize: "11px" }}
                    >
                      {"iPhone 16 Pro | 256GB 6GB RAM"}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontSize: "11px" }}>
                    &#8358;{currencyFormater(40000, 2)}
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontSize: "11px" }}>
                    {dayjs().format(FULL_DATE_FORMAT)}
                  </StyledTableCell>

                  <StyledTableCell sx={{ fontSize: "11px" }}>
                    {renderStatus("completed")}
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
      </TableContainer>
    </Box>
  );
};

export default LatestOrderTable;
