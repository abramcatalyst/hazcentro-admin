import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import ProductInfoBox from "src/components/shared/ProductInfoBox/ProductInfoBox";
import MachineImg from "src/assets/tempimages/machine1.jpg";
import { currencyFormater } from "src/utils";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";

const headCells = [
  "Buyer ID",
  "Merc. ID",
  "Product Detail",
  "Amount",
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

const AssignmentsTable = () => {
  // const renderStatus = (stat:string) => {
  //   if(stat === 'processing'){
  //     return (
  //       <Box sx={{ display: "flex", gap: 0.5, my: 0.4, alignItems: "center" }}>
  //         <Box
  //           sx={{
  //             width: "7px",
  //             height: "7px",
  //             borderRadius: "50%",
  //             background: theme.palette.success.light,
  //           }}
  //         />
  //         <Typography sx={{ fontSize: "12.3px", textTransform: "capitalize" }}>
  //           {stat || "Active"}
  //         </Typography>
  //       </Box>
  //     );
  //   }
  // }
  return (
    <Box sx={{ background: "#ffffff", p: 1, borderRadius: "20px", mb: 1 }}>
      {/* {openDeleteDialog && (
        <DeleteAgentDialog
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
        />
      )} */}

      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <EnhancedTableHead />
          <TableBody>
            {[1, 2, 3, 4, 5, 6, 7].map((row, index) => {
              return (
                <TableRow key={`${row}${index}`}>
                  <StyledTableCell sx={{ minWidth: "120px" }}>
                    <Box>
                      <ProductInfoBox
                        direction="column"
                        image={MachineImg}
                        title={"Bright Okon"}
                        caption1="ID:234123AW"
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "120px" }}>
                    <Box>
                      <ProductInfoBox
                        direction="column"
                        image={MachineImg}
                        title={"Bright Okon"}
                        caption1="ID:234123AW"
                      />
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography sx={{ fontSize: "13px" }}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur ad delectus blanditiis.
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    &#8358;{currencyFormater(40000)}
                  </StyledTableCell>
                  <StyledTableCell>{renderStatus("completed")}</StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssignmentsTable;
