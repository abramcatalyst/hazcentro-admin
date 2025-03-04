import Box from "@mui/material/Box";
import { useState } from "react";
import OrdersTab from "./OrdersTab";
import OrdersTable from "./OrdersTable";
import { tabOptions } from "../../OrderManagement/OrderManagementWrapper";

const OrdersWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);

  return (
    <Box sx={{ width: "100%" }}>
      <OrdersTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <OrdersTable />
    </Box>
  );
};

export default OrdersWrapper;
