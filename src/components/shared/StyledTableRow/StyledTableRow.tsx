import TableRow from "@mui/material/TableRow";
import { alpha, styled } from "@mui/material/styles";
import { GLOBAL_COLORS } from "src/utils";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderRadius: "6px",
  backgroundColor: theme.palette.grey[100],
  borderBottomColor: "#ffffff",
  mb: 3,
  "&:nth-of-type(even)": {
    backgroundColor: alpha(theme.palette.grey[100], 0.1),
  },
  "&.Mui-selected": {
    backgroundColor: GLOBAL_COLORS.YELLOW_500,
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.4), // Hover effect when selected
    },
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StyledTableRow;
