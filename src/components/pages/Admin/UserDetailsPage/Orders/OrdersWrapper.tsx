import Box from "@mui/material/Box";
import { useState } from "react";
import OrdersTab from "./OrdersTab";
import OrdersTable from "./OrdersTable";
import { tabOptions } from "../../OrderManagement/OrderManagementWrapper";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchSingleUsersOrders } from "src/services/orders";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
  sStatus,
} from "src/utils";

const OrdersWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;
  const status = searchParams.get(sStatus) || "";

  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER_ORDERS,
      { status, id },
    ],
    queryFn: () =>
      fetchSingleUsersOrders({ id: id || "", page, limit, status }),
  });

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

  return (
    <Box sx={{ width: "100%" }}>
      <OrdersTab selectedTab={selectedTab} handleChangeTab={handleChangeTab} />
      {isPending ? (
        <HalfScreenLoader />
      ) : isError ? (
        <HalfScreenError text={formatErrorMessage(error)} />
      ) : (
        <OrdersTable data={data?.data} pagination={data?.pagination} />
      )}
    </Box>
  );
};

export default OrdersWrapper;
