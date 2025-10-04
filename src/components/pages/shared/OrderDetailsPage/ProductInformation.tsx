import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Logo from "src/assets/images/logo.png";

import Typography from "@mui/material/Typography";
import { currencyFormater, GLOBAL_COLORS } from "src/utils";
import { OrderType } from "src/types/orders";

type Props = {
  selectedOrder: OrderType;
};

const headCells = [
  "S/N",
  "Image",
  "Title",
  "Price",
  "Discount Price",
  "Warranty",
  "Vendor",
];
const tableCellStyles = { fontSize: "13px" };
function ProductInformation({ selectedOrder }: Props) {
  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "16px",
      }}
    >
      {/* <Box
        sx={{
          my: 1,
          background: "#F1F1F1",
          maxWidth: "381px",
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >
        {options.map((item) => {
          return (
            <Box
              key={item}
              sx={{
                borderRadius: "6px",
                py: 0.5,
                width: { xs: "100%", sm: "100px" },
                height: "33px",
                background: selectedOption === item ? "#DDDDDD" : "#F8F8F9",
                cursor: "pointer",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectedOption(item);
              }}
            >
              <Typography variant="body2">{item}</Typography>
            </Box>
          );
        })}
      </Box> */}
      <Box>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 0.6, ml: 1 }}>
          Ordered Items
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {headCells.map((item) => (
                  <TableCell key={item} component="th">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder?.order_items?.map((row, idx) => (
                <TableRow key={row?.id}>
                  <TableCell sx={tableCellStyles}>{idx + 1}</TableCell>
                  <TableCell>
                    <Box>
                      <img
                        src={row?.product?.media[0]?.original_url || Logo}
                        alt={"Product"}
                        style={{
                          width: "42px",
                          height: "42px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    {row?.product?.name}
                  </TableCell>

                  <TableCell sx={tableCellStyles}>
                    &#8358;{currencyFormater(row?.product?.price, 2)}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    &#8358;{currencyFormater(row?.product?.discounted_price, 2)}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    {row?.product?.warranty}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    {row?.product?.vendor?.business_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
export default ProductInformation;
