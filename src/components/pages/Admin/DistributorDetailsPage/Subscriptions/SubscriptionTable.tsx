import Box from "@mui/material/Box";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { SubscriptionItem } from "../../SkilledWorkProviderDetailsPage/Subscriptions/SubscriptionTable";

const headCells = [
  "Order ID",
  "Order Name",
  "Amount",
  "Date Created",
  "Buyer Name",
  "Merchant Name",
];

function SubscriptionTable() {
  return (
    <Box
      sx={{
        width: "100%",
        my: 1,
        background: "#ffffff",
        py: 1,
        px: { xs: 0.5, sm: 1 },
        borderRadius: "25px",
      }}
    >
      <Box>
        <ProfileTitle text="History" />
      </Box>

      <Box>
        {headCells.map((row) => {
          return <SubscriptionItem key={row} />;
        })}
      </Box>
    </Box>
  );
}

export default SubscriptionTable;
