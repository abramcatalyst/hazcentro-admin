import Box from "@mui/material/Box";
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionInfo from "./SubscriptionInfo";

import UserHeader from "../UserHeader";
import { UserType } from "src/types/users";

type Props = {
  userData: UserType;
};
const SubscriptionWrapper = ({ userData }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <UserHeader data={userData} />

      <SubscriptionInfo />
      <SubscriptionTable />
    </Box>
  );
};

export default SubscriptionWrapper;
