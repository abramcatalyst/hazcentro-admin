import { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import OrdersTab from "./OrdersTab";
import OrdersTable from "./OrdersTable";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
  sStatus,
} from "src/utils";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchCustomerCareOrders } from "src/services/orders";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

export const usersViewTabOptionsObj = {
  E_COMMERCE: "E_COMMERCE",
  SERVICES: "SERVICES",
};
export const tabOptionsObj = {
  ACTIVE: "processing",
  DELIVERED: "completed",
  PENDING: "pending",
  CANCELLED: "canceled",
  DECLINED: "declined",
};

export const tabOptions = [
  {
    title: "All Orders",
    value: "",
  },
  {
    title: "Active Orders",
    value: tabOptionsObj.ACTIVE,
  },
  {
    title: "Delivered",
    value: tabOptionsObj.DELIVERED,
  },
  {
    title: "Pending",
    value: tabOptionsObj.PENDING,
  },
  {
    title: "Cancelled",
    value: tabOptionsObj.CANCELLED,
  },
  {
    title: "Declined",
    value: tabOptionsObj.DECLINED,
  },
];
export const usersViewTabOptions = [
  {
    title: "E-Commerce",
    value: usersViewTabOptionsObj.E_COMMERCE,
  },
  {
    title: "Services",
    value: usersViewTabOptionsObj.SERVICES,
  },
];
const CustomerCareOrdersWrapper = () => {
  //   const [view, setView] = useState(usersViewTabOptions[0].value);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;
  const status = searchParams.get(sStatus) || "";

  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_CUSTOMER_CARE_ORDERS,
      { limit, page, status },
    ],
    queryFn: () => fetchCustomerCareOrders({ limit, page, status }),
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

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "1");
        return params;
      },
      { replace: true }
    );
  };

  const handleChangeTab = (value: string) => {
    setSelectedTab(value);
    setSearchParams(
      (params) => {
        params.set(sStatus, value);
        return params;
      },
      { replace: true }
    );
  };

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  console.log("bbbbbbb", data);
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
        <AppHeader text="Order Management" />
      </Box>
      <OrdersTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        selectedUsers={selectedUsers}
        handleChangeTab={handleChangeTab}
      />
      {isPending ? (
        <HalfScreenLoader />
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <Box>
            {data?.total === 0 ? (
              <EmptyTable subText="No orders found" />
            ) : (
              <OrdersTable
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                data={data?.data}
              />
            )}
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
        </ErrorBoundary>
      )}
    </Box>
  );
};

export default CustomerCareOrdersWrapper;
