import Box from "@mui/material/Box";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { SubscriptionItem } from "../../SkilledWorkProviderDetailsPage/Subscriptions/SubscriptionTable";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import { useParams } from "react-router-dom";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQuery } from "@tanstack/react-query";
import { fetchVendorSubscriptionsData } from "src/services/users";

const headCells = [
  "Order ID",
  "Order Name",
  "Amount",
  "Date Created",
  "Buyer Name",
  "Merchant Name",
];

function SubscriptionTable() {
  const { id } = useParams();

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_OVERVIEW,
      { id },
    ],
    queryFn: () => fetchVendorSubscriptionsData({ id: id }),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  console.log("dddddddddddddd", data);
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
