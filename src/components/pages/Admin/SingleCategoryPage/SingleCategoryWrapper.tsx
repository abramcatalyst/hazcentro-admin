import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SingleCategoryTab from "./SingleCategoryTab";
import ProductsTable from "./ProductsTable";
import {
  formatErrorMessage,
  getSelectedPageView,
  rowsPerPageOptions,
  setSelectedPageView,
  sLimit,
  sPage,
} from "src/utils";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import ProductsGridTable from "./ProductsGridTable";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { fetchSingleCategory } from "src/services/categories";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useParams, useSearchParams } from "react-router-dom";

export const pageViewTabOptionsObj = {
  GRID: "GRID",
  TABLE: "TABLE",
};
export const usersPageTabOptionsObj = {
  DETAILS: "DETAILS",
};
export const tabOptions = [
  {
    title: "Details",
    value: usersPageTabOptionsObj.DETAILS,
  },
];
export const usersViewTabOptions = [
  {
    title: "GRID",
    value: pageViewTabOptionsObj.GRID,
  },
  {
    title: "TABLE",
    value: pageViewTabOptionsObj.TABLE,
  },
];
const SingleCategoryWrapper = () => {
  const [view, setView] = useState(usersViewTabOptions[0].value);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;

  const params = useParams();
  const queryClient = useQueryClient();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_CATEGORY,
      { limit, page },
    ],
    queryFn: () => fetchSingleCategory(params.id || ""),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_CATEGORY],
      });
    };
  }, [params?.id]);

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

  console.log("", handleChangePage, handleChangeRowsPerPage);

  const handleChangeView = (val: string) => {
    setView(val);
    setSelectedPageView(val);
  };
  useEffect(() => {
    const res = getSelectedPageView();
    if (res) {
      handleChangeView(res);
    } else {
      handleChangeView(usersViewTabOptions[0].value);
    }
  }, []);

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }

  console.log("dddddddddddddd", data);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <AppHeader text={data?.name || ""} />
      </Box>
      <SingleCategoryTab
        selectedTab={selectedTab}
        view={view}
        setSelectedTab={setSelectedTab}
        selectedUsers={selectedUsers}
        handleChangeView={handleChangeView}
      />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        {view === pageViewTabOptionsObj.TABLE && (
          <ProductsTable
            data={data}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        )}
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        {view === pageViewTabOptionsObj.GRID && (
          <ProductsGridTable data={data} />
        )}
      </ErrorBoundary>
    </Box>
  );
};

export default SingleCategoryWrapper;
