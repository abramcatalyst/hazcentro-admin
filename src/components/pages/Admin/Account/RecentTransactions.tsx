import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DebitImage from "src/assets/icons/debit.svg";
import CreditImage from "src/assets/icons/credit.svg";
import { currencyFormater } from "src/utils";
import { alpha, useTheme } from "@mui/material/styles";
import dayjs from "dayjs";

type TransactionCardProps = {
  transactionType: "debit" | "credit";
  amount: number | string;
};
const RecentTransactions = () => {
  const theme = useTheme();
  const TransactionCard = ({
    transactionType,
    amount,
  }: TransactionCardProps) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          background: theme.palette.common.white,
          border: `1px solid ${theme.palette.grey[100]}`,
          py: 1,
          px: 0.7,
          borderRadius: "16px",
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            background: theme.palette.common.white,
          }}
        >
          <Box
            sx={{
              borderRadius: "6px",
              background:
                transactionType === "credit"
                  ? "#47B48E1A"
                  : alpha("#EE1616", 0.1),
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={transactionType === "credit" ? CreditImage : DebitImage}
              alt="trans"
              style={{ width: "32px", height: "32px", objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
              &#8358;{currencyFormater(amount)}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color:
                  transactionType === "credit"
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {transactionType === "credit" ? "Credited" : "Debited"}
            </Typography>
          </Box>
        </Box>
        <Typography variant="subtitle2">
          {dayjs().format("MMM Do YY")}
        </Typography>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        mb: 1,
        p: { xs: 1 },
        background: "#ffffff",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          mt: 2,
          mb: 1,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" pl={1} gutterBottom>
          Recent Transactions
        </Typography>
        <Button
          color="inherit"
          size="small"
          sx={{
            background: theme.palette.grey[100],
            "&:hover": { background: theme.palette.grey[200] },
          }}
        >
          Download History
        </Button>
      </Box>
      <Box sx={{ my: 1, maxHeight: "300px", overflowY: "auto" }}>
        <TransactionCard amount={345000} transactionType="credit" />
        <TransactionCard amount={45000} transactionType="credit" />
        <TransactionCard amount={3000} transactionType="debit" />
      </Box>
    </Box>
  );
};

export default RecentTransactions;
