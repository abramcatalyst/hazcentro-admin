import { useState } from "react";
import Box from "@mui/material/Box";
import UsersTab from "./UsersTab";
import BuyersTable from "./Buyers/BuyersTable";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import DistributorsTable from "./Distributors/DistributorsTable";
import ServiceWorkersTable from "./ServiceWorkers/ServiceWorkersTable";
import { useSearchParams } from "react-router-dom";
import { sSelected } from "src/utils";

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
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  const [searchParams, setSearchParams] = useSearchParams({
    [sSelected]: usersTabOptions[0].value,
  });
  const selectedTab = searchParams.get(sSelected) || usersTabOptions[0]?.value;

  const handleChangeTab = (val: string) => {
    setSearchParams(
      (params) => {
        params.set(sSelected, val);
        return params;
      },
      { replace: true },
    );
  };
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
        handleChangeTab={handleChangeTab}
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
