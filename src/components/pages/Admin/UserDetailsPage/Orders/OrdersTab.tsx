import Box from "@mui/material/Box";
import CustomTab from "src/components/shared/CustomTab/CustomTab";
import { tabOptions } from "src/components/pages/Admin/OrderManagement/OrderManagementWrapper";

type Props = {
  selectedTab: string;
  handleChangeTab: (val: string) => void;
};
const OrdersTab = ({ selectedTab, handleChangeTab }: Props) => {
  const handleClick = (value: string) => {
    handleChangeTab(value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ pl: 2, display: "flex", gap: 1, mb: 2 }}>
        {tabOptions.map((item) => {
          return (
            <CustomTab
              key={item.value}
              handleClick={handleClick}
              value={item.value}
              title={item.title}
              active={item.value === selectedTab}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default OrdersTab;
