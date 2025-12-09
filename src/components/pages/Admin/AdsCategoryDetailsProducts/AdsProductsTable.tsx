import { memo, useState } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import StyledTableCell from "src/components/shared/StyledTableCell/StyledTableCell";
import {
  baseUrl,
  currencyFormater,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  rowsPerPageOptions,
  setDefaultHeaders,
  sLimit,
  sPage,
} from "src/utils";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useParams, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { AdsCategoryProductType } from "src/types/banners";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";
import axios from "axios";
import toast from "react-hot-toast";

const headCells = [
  "Name of Product",
  "Image",
  "Quantity",
  "Amount",
  "Discout Price",
  "Discout %",
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
  data: {
    data: AdsCategoryProductType[];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: [];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
};
const AdsProductsTable = ({ data }: Props) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleSubmitDelete = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);
      const payload = { remove_product_ids: [...selectedItems] };
      const res = await axios.patch(
        `${baseUrl}/admin/categories-for-ads/${id}/products`,
        payload
      );

      await queryClient.invalidateQueries({
        queryKey: [
          TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_ADS_CATEGORY_PRODUCTS,
        ],
      });
      handleCloseDelete();
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);
      setSelectedItems(new Set());
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;

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

  console.log("selected items", selectedItems);
  return (
    <Box sx={{ background: "#ffffff", p: 1, borderRadius: "20px", mb: 1 }}>
      {openDelete && (
        <GeneralConfirmDialog
          open={openDelete}
          hint={
            selectedItems?.size > 1
              ? `Kindly confirm to remove these items from this ad category`
              : `Kindly confirm to remove this item from this ad category`
          }
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmitDelete}
          handleClose={handleCloseDelete}
        />
      )}

      <TableContainer>
        {selectedItems?.size > 0 && (
          <Box sx={{ mb: 0.7 }}>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                handleOpenDelete();
              }}
            >
              Remove {selectedItems?.size}{" "}
              {selectedItems?.size > 1 ? "items" : "item"}
            </Button>
          </Box>
        )}
        {data?.data?.length === 0 ? (
          <EmptyTable subText="No products found" />
        ) : (
          <Table sx={{ minWidth: 650 }} size={"small"}>
            <EnhancedTableHead />
            <TableBody>
              {data?.data?.map((row) => {
                const isItemSelected = selectedItems.has(row?.id);

                return (
                  <TableRow key={row?.id}>
                    <StyledTableCell
                      padding="checkbox"
                      sx={{ minWidth: { xs: "140px", sm: "150px" } }}
                    >
                      <Checkbox
                        color="warning"
                        size="small"
                        checked={isItemSelected}
                        value={row?.id}
                        onChange={() => {
                          if (selectedItems.has(row?.id)) {
                            setSelectedItems((prev) => {
                              const newSet = new Set(prev);
                              newSet.delete(row?.id);
                              return newSet;
                            });
                          } else {
                            setSelectedItems((prev) =>
                              new Set(prev).add(row?.id)
                            );
                          }
                        }}
                        sx={{ mr: 0.8 }}
                      />
                      {row?.name || "N/A"}
                    </StyledTableCell>

                    <StyledTableCell>
                      {row?.image ? (
                        <img
                          src={row?.image}
                          alt={row?.name}
                          style={{
                            width: "60px",
                            height: "35px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{row?.stock_quantity}</StyledTableCell>

                    <StyledTableCell>
                      &#8358;{currencyFormater(row?.price, 2)}
                    </StyledTableCell>
                    <StyledTableCell>
                      &#8358;{currencyFormater(row?.discounted_price, 2)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {currencyFormater(row?.discount_percentage, 2)}
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Box sx={{ my: 1 }}>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data?.meta?.total || 0}
          rowsPerPage={limit || rowsPerPageOptions[0]}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default memo(AdsProductsTable);
