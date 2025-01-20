import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UsersTab from "./UsersTab";
import BuyersTable from "./Buyers/BuyersTable";
import { GLOBAL_COLORS } from "src/utils";
import AppHeader from "src/components/shared/AppHeader/AppHeader";

export const usersViewTabOptionsObj = {
  E_COMMERCE: "E_COMMERCE",
  SERVICES: "SERVICES",
};
export const usersPageTabOptionsObj = {
  BUYERS: "BUYERS",
  DISTRIBUTORS: "DISTRIBUTORS",
  GUESTS: "GUESTS",
};
export const usersTabOptions = [
  {
    title: "Buyers",
    value: usersPageTabOptionsObj.BUYERS,
  },
  {
    title: "Distributors",
    value: usersPageTabOptionsObj.DISTRIBUTORS,
  },
  {
    title: "Guests",
    value: usersPageTabOptionsObj.GUESTS,
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
const UsersWrapper = () => {
  const [view, setView] = useState(usersViewTabOptions[0].value);
  const [selectedTab, setSelectedTab] = useState(usersTabOptions[0].value);
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
        <AppHeader text="User Mangement" />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {usersViewTabOptions.map((item) => (
            <Box
              sx={{
                height: "42px",
                minWidth: "88px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                background:
                  item.value === view ? "#47B48E0D" : GLOBAL_COLORS.GREY_10,
                color: item.value === view ? "#47B48E" : "GrayText",
                borderRadius: "12px",
                border: item.value === view ? `2px solid #47B48E` : "none",
                cursor: "pointer",
              }}
              key={item.title}
              onClick={() => {
                setView(item.value);
              }}
            >
              <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                {item?.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <UsersTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        selectedUsers={selectedUsers}
      />
      <BuyersTable
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />
    </Box>
  );
};

export default UsersWrapper;
