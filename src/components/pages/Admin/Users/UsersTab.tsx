import Box from "@mui/material/Box";
import { usersTabOptions } from "./UsersWrapper";
import CustomDeleteButton from "src/components/shared/CustomDeleteButton/CustomDeleteButton";
import CustomTab from "src/components/shared/CustomTab/CustomTab";

type Props = {
  selectedTab: string;
  selectedUsers: Set<number | string>;
  handleChangeTab: (val: string) => void;
};
const UsersTab = ({ selectedTab, handleChangeTab, selectedUsers }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ pl: 2, display: "flex", gap: 1, mb: 2 }}>
        {usersTabOptions.map((item) => {
          return (
            <CustomTab
              key={item.value}
              handleClick={handleChangeTab}
              value={item.value}
              title={item.title}
              active={item.value === selectedTab}
            />
          );
        })}
      </Box>
      {selectedUsers?.size > 0 && <CustomDeleteButton />}
    </Box>
  );
};

export default UsersTab;
