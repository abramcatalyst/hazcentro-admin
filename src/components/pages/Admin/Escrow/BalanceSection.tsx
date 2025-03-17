import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EscrowChart from "./EscrowChart";

function BalanceSection() {
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
      <EscrowChart />
    </Box>
  );
}
export default BalanceSection;
