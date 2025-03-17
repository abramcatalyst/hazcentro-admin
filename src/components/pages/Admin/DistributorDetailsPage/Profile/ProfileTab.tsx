import Box from "@mui/material/Box";
import CustomTab from "src/components/shared/CustomTab/CustomTab";
import { profileTabOptions } from "./ProfileWrapper";

type Props = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};
const ProfileTab = ({ selectedTab, setSelectedTab }: Props) => {
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
        {profileTabOptions.map((item) => {
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

export default ProfileTab;
