import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { usersTabOptions } from "./UsersWrapper";
import { GLOBAL_COLORS } from "src/utils";
import CustomDeleteButton from "src/components/shared/CustomDeleteButton/CustomDeleteButton";

type Props = {
  selectedTab: string;
  selectedUsers: Set<number | string>;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};
const UsersTab = ({ selectedTab, setSelectedTab, selectedUsers }: Props) => {
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
            <Box
              key={item?.value}
              onClick={() => {
                setSelectedTab(item.value);
              }}
              sx={{
                background:
                  selectedTab === item.value
                    ? "#FFCC161A"
                    : GLOBAL_COLORS.GREY_10,
                cursor: "pointer",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
              }}
            >
              <Box
                sx={{
                  height: "40px",
                  px: 1.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
                  {item?.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  background:
                    selectedTab === item?.value
                      ? GLOBAL_COLORS.PRIMARY_MAIN
                      : "default",
                  height: "2px",
                  width: "100%",
                }}
              />
            </Box>
          );
        })}
      </Box>
      {selectedUsers?.size > 0 && <CustomDeleteButton />}
    </Box>
  );
};

export default UsersTab;
