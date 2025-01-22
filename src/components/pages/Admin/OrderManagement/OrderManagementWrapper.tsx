import { useState } from "react";
import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import OrdersTab from "./OrdersTab";
import OrdersTable from "./OrdersTable";

export const usersViewTabOptionsObj = {
  E_COMMERCE: "E_COMMERCE",
  SERVICES: "SERVICES",
};
export const tabOptionsObj = {
  ACTIVE: "ACTIVE",
  DELIVERED: "DELIVERED",
  PENDING: "PENDING",
  CANCELLED: "CANCELLED",
};
export const tabOptions = [
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
const OrderManagementWrapper = () => {
  //   const [view, setView] = useState(usersViewTabOptions[0].value);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
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
      />
      <OrdersTable
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </Box>
  );
};

export default OrderManagementWrapper;
