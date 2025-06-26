import Box from "@mui/material/Box";
import CustomTab from "src/components/shared/CustomTab/CustomTab";
import { tabOptions } from "./OrdersWrapper";

type Props = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};
const OrdersTab = ({ selectedTab, setSelectedTab }: Props) => {
  const handleClick = (value: string) => {
    setSelectedTab(value);
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
              size="small"
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default OrdersTab;
