import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchWorkerPortfolio } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
} from "src/utils";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { ChangeEvent } from "react";
import Portfolios from "../Overview/Portfolios";

const FullPortfoliosTable = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_WORKER_FULL_PORTFOLIOS,
      { id, page, limit },
    ],
    queryFn: () => fetchWorkerPortfolio({ id: id, page, limit }),
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams(
      (params) => {
        params.set(sPage, `${newPage + 1}`);
        return params;
      },
      { replace: true },
    );
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "1");
        return params;
      },
      { replace: true },
    );
  };

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <>
      <Box
        component={Paper}
        sx={{
          p: 1,
          mb: 1,
          width: "100%",
        }}
        elevation={0}
      >
        <Box sx={{ my: 1 }}>
          <ProfileTitle text="Portfolios" />
        </Box>

        {data?.meta?.total > 0 ? (
          <Portfolios portfolios={data?.data ?? []} compact={false} />
        ) : (
          <EmptyTable subText="No portfolio uploaded" />
        )}
      </Box>
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
    </>
  );
};

export default FullPortfoliosTable;
