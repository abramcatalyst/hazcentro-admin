import Box from "@mui/material/Box";
import UserHeader from "../UserHeader";
import FullPortfoliosTable from "./FullPortfoliosTable";
import { UserType } from "src/types/users";

type Props = {
  userData: UserType;
};
const FullPortfoliosWrapper = ({ userData }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <UserHeader data={userData} />
      <FullPortfoliosTable />
    </Box>
  );
};

export default FullPortfoliosWrapper;
