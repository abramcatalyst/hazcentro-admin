import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EscrowChart from "./EscrowChart";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchEscrowBalance } from "src/services/escrow";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";

function BalanceSection() {
  const { error, data, isError, isPending } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_ESCROW_BALANCE],
    queryFn: () => fetchEscrowBalance(),
  });

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px",
        py: { xs: 1, sm: 3 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontSize: "16px", lineHeight: "100%", fontWeight: 600 }}
      >
        Balance
      </Typography>
      <Box mt={1}>
        <Typography sx={{ color: "GrayText", fontSize: "12px" }}>
          Active escrow balance
        </Typography>
      </Box>
      <EscrowChart data={data} />
    </Box>
  );
}
export default BalanceSection;
