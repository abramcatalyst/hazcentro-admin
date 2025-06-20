import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import {
  currencyFormater,
  formatErrorMessage,
  FULL_DATE_FORMAT,
} from "src/utils";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import dayjs from "dayjs";
import { fetchSingleUsersOrders } from "src/services/orders";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";

const headCells = [
  "Order ID",
  "Assigned Agent",
  "Amount",
  "Date",
  "Status",
  "",
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

const LatestOrderTable = () => {
  const { id } = useParams();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER_ORDERS, { id }],
    queryFn: () => fetchSingleUsersOrders({ id: id || "", limit: 8 }),
  });

  if (isPending) {
    return (
      <Box>
        <Skeleton height={50} sx={{ my: 0.5 }} />
        <Skeleton height={50} sx={{ my: 0.5 }} />
        <Skeleton height={50} sx={{ my: 0.5 }} />
        <Skeleton height={50} sx={{ my: 0.5 }} />
        <Skeleton height={50} sx={{ my: 0.5 }} />
      </Box>
    );
  }
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
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
            {data?.data?.map((row, index) => {
              return (
                <TableRow key={`${row?.id}${index}`} hover>
                  <StyledTableCell sx={{ fontSize: "11px" }}>
                    {row?.tracking_id}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      noWrap
                      variant="subtitle2"
                      // sx={{ fontSize: "11px" }}
                    >
                      {row?.agent?.name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontSize: "11px" }}>
                    &#8358;{currencyFormater(row?.total_price, 2)}
                  </StyledTableCell>
                  <StyledTableCell sx={{ fontSize: "11px" }}>
                    {dayjs().format(FULL_DATE_FORMAT)}
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
      </TableContainer>
    </Box>
  );
};

export default LatestOrderTable;
