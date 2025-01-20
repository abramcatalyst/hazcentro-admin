import React from "react";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useTheme } from "@mui/material/styles";
import StyledOutlinedInput from "../StyledOutlinedInput/StyledOutlinedInput";

export const rowsPerPageOptions: number[] = [50, 100, 200];
// export const rowsPerPageOptions: number[] = [2, 5, 8];

type Props = {
  page: number;
  rowsPerPage: number;
  totalCount?: number;
  totalPages?: number;
  currentPage?: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
function StyledPagination({
  page,
  rowsPerPage,
  totalPages = 0,
  totalCount = 0,
  currentPage = 0,
  handleChangePage,
  handleChangeRowsPerPage,
}: Props) {
  const theme = useTheme();

  const iconButtonStyles = {
    borderRadius: "5px",
    background: theme.palette.primary.main,
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5px",
      }}
    >
      <TablePagination
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="per page"
        labelDisplayedRows={function defaultLabelDisplayedRows({ page }) {
          return `${currentPage ? currentPage : page} of ${totalPages}`;
        }}
        onPageChange={handleChangePage}
        slotProps={{
          actions: {
            nextButtonIcon: <ChevronRightRoundedIcon sx={iconButtonStyles} />,
            previousButtonIcon: (
              <ChevronLeftRoundedIcon sx={iconButtonStyles} />
            ),
          },
        }}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <StyledOutlinedInput
        placeholder="Page No."
        sx={{ width: "90px", background: "#F4F6F9", color: "#000000" }}
        size="small"
      />
    </Box>
  );
}

export default StyledPagination;
