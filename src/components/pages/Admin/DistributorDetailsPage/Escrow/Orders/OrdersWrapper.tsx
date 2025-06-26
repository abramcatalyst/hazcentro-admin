import Box from "@mui/material/Box";
import { useState } from "react";
import OrdersTab from "./OrdersTab";
import OrdersTable from "./OrdersTable";
import { tabOptionsObj } from "src/components/pages/Admin/OrderManagement/OrderManagementWrapper";
import { EscrowResType } from "src/types/escrow";

export const tabOptions = [
  {
    title: "Active Orders",
    value: tabOptionsObj.ACTIVE,
  },
  {
    title: "Delivered",
    value: tabOptionsObj.DELIVERED,
  },
];

type Props = {
  data: EscrowResType;
};
const OrdersWrapper = ({ data }: Props) => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <OrdersTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <OrdersTable
        data={
          selectedTab === tabOptionsObj.ACTIVE
            ? data?.active_orders
            : data?.delivered_orders
        }
      />
    </Box>
  );
};

export default OrdersWrapper;
