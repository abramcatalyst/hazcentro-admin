import Box from "@mui/material/Box";
import CustomTab from "src/components/shared/CustomTab/CustomTab";
import { rateAndReviewTabOptions } from "./RateAndReviewsWrapper";

type Props = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};
const RateAndReviewsTab = ({ selectedTab, setSelectedTab }: Props) => {
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 0.3, mt: 0.8 }}>
        {rateAndReviewTabOptions.map((item) => {
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

export default RateAndReviewsTab;
