import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import { pageViewTabOptionsObj, tabOptions } from "./SingleCategoryWrapper";
import CustomTab from "src/components/shared/CustomTab/CustomTab";

type Props = {
  selectedTab: string;
  selectedUsers: Set<number | string>;
  view: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  handleChangeView: (val: string) => void;
};
const SingleCategoryTab = ({
  selectedTab,
  setSelectedTab,
  view,
  handleChangeView,
}: Props) => {
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
            />
          );
        })}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          color={view === pageViewTabOptionsObj.TABLE ? "primary" : "inherit"}
          onClick={() => {
            handleChangeView(pageViewTabOptionsObj.TABLE);
          }}
        >
          <ReorderRoundedIcon />
        </IconButton>
        <IconButton
          color={view === pageViewTabOptionsObj.GRID ? "primary" : "inherit"}
          onClick={() => {
            handleChangeView(pageViewTabOptionsObj.GRID);
          }}
        >
          <GridViewRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SingleCategoryTab;
