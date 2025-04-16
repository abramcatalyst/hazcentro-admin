import { useState } from "react";
import Box from "@mui/material/Box";
import UsersTab from "./UsersTab";
import BuyersTable from "./Buyers/BuyersTable";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import DistributorsTable from "./Distributors/DistributorsTable";
import ServiceWorkersTable from "./ServiceWorkers/ServiceWorkersTable";

export const usersViewTabOptionsObj = {
  E_COMMERCE: "E_COMMERCE",
  SERVICES: "SERVICES",
};
export const usersPageTabOptionsObj = {
  BUYERS: "BUYERS",
  DISTRIBUTORS: "DISTRIBUTORS",
  SERVICE_WORKERS: "SERVICE_WORKERS",
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
    title: "Service Workers",
    value: usersPageTabOptionsObj.SERVICE_WORKERS,
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
        <AppHeader text="User Management" />
      </Box>
      <UsersTab
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        selectedUsers={selectedUsers}
      />
      {selectedTab === usersPageTabOptionsObj.BUYERS && (
        <BuyersTable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      )}
      {selectedTab === usersPageTabOptionsObj.DISTRIBUTORS && (
        <DistributorsTable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      )}
      {selectedTab === usersPageTabOptionsObj.SERVICE_WORKERS && (
        <ServiceWorkersTable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      )}
    </Box>
  );
};

export default UsersWrapper;
