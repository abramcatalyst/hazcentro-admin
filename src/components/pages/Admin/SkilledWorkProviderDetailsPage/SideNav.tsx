import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { profileTabOptions } from "./SkilledWorkProviderWrapper";
import { GLOBAL_COLORS } from "src/utils";

type Props = {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};
const SideNav = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <Box
      component={Paper}
      sx={{ p: 1, borderRadius: "12px", height: "100%" }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography
          sx={{ fontWeight: 500, fontSize: "12px", color: "GrayText" }}
        >
          Full Profile
        </Typography>
      </Box>
      <Box sx={{}}>
        {profileTabOptions.map((item) => {
          return (
            <Box
              key={item.value}
              sx={{ my: 2, cursor: "pointer" }}
              onClick={() => {
                setSelectedTab(item.value);
              }}
            >
              <Typography
                sx={{
                  fontSize: selectedTab === item.value ? "13px" : "12px",

                  color:
                    selectedTab === item.value
                      ? GLOBAL_COLORS.GREEN_MAIN
                      : "auto",
                  fontWeight: selectedTab === item.value ? 600 : "auto",
                }}
              >
                {item?.title}
              </Typography>{" "}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SideNav;
