import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// import Checkbox from "@mui/material/Checkbox";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import dayjs from "dayjs";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
  tableMenuStyles,
} from "src/utils";
import StyledTableRow from "src/components/shared/StyledTableRow/StyledTableRow";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { fetchAdsCategories } from "src/services/banners";
import { AdsCategoryType } from "src/types/banners";
import PreviewAdsCategoryDialog from "./PreviewAdsCategory";

dayjs.extend(advancedFormat);

const headCells = [
  "Name",
  "Description",
  "Start Date",
  "End Date",
  "Date Created",
  "Action",
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="warning"

          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell key={headCell}>{headCell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function AdsCategoryTable() {
  const [openPreviewProfile, setOpenPreviewProfile] = useState(false);
  const [selected, setSelected] = useState<AdsCategoryType | null>(null);

  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADS_CATEGORIES,
      { limit, page },
    ],
    queryFn: () =>
      fetchAdsCategories({
        limit: limit,
        page: page,
      }),
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams(
      (params) => {
        params.set(sPage, `${newPage + 1}`);
        return params;
      },
      { replace: true }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "1");
        return params;
      },
      { replace: true }
    );
  };

  const handleOpenPreviewProfile = (info: AdsCategoryType) => {
    setSelected(info);

    setOpenPreviewProfile(true);
  };
  const handleClosePreviewProfile = () => {
    setSelected(null);
    setOpenPreviewProfile(false);
  };
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }
  console.log("55555555555555", data);
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreviewProfile && selected && (
        <PreviewAdsCategoryDialog
          open={openPreviewProfile}
          selected={selected}
          handleClose={handleClosePreviewProfile}
        />
      )}

      <TableContainer>
        {data?.total > 0 ? (
          <Box>
            <Table sx={{ minWidth: 700 }} size={"small"}>
              <EnhancedTableHead

              //   onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {data?.data?.map((row) => {
                  return (
                    <StyledTableRow hover key={row?.id}>
                      {/* <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="warning"
                          size="small"
                          checked={isItemSelected}
                          onChange={() => {
                            if (selected.has(index)) {
                              setSelected((prev) => {
                                const newSet = new Set(prev);
                                newSet.delete(index);
                                return newSet;
                              });
                            } else {
                              setSelected((prev) =>
                                new Set(prev).add(index)
                              );
                            }
                          }}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </StyledTableCell> */}
                      <StyledTableCell>{row?.name}</StyledTableCell>
                      <StyledTableCell>{row?.description}</StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row?.start_date).format("MMM Do YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>
                        {dayjs(row?.end_date).format("MMM Do YYYY")}
                      </StyledTableCell>{" "}
                      <StyledTableCell>
                        {dayjs(row?.created_at).format("MMM Do YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>
                        <PopupState variant="popover">
                          {(popupState) => (
                            <Fragment>
                              <IconButton {...bindTrigger(popupState)}>
                                <MoreHorizRoundedIcon />
                              </IconButton>
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                  onClick={() => {
                                    handleOpenPreviewProfile(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Preview
                                </MenuItem>
                              </Menu>
                            </Fragment>
                          )}
                        </PopupState>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Box sx={{ my: 1 }}>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data?.total || 0}
                rowsPerPage={limit || rowsPerPageOptions[0]}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        ) : (
          <EmptyTable isSmall subText="No category found" />
        )}
      </TableContainer>
    </Box>
  );
}

export default AdsCategoryTable;
