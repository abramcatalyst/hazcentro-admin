import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DebitImage from "src/assets/icons/debit.svg";
import CreditImage from "src/assets/icons/credit.svg";
import { currencyFormater } from "src/utils";
import { alpha, useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import {
  SettingsSummaryRecentTransactionType,
  SettingsSummaryType,
} from "src/types/settings";

type TransactionCardProps = {
  data: SettingsSummaryRecentTransactionType;
};
type Props = {
  data: SettingsSummaryType;
};
const RecentTransactions = ({ data }: Props) => {
  const theme = useTheme();
  const TransactionCard = ({ data }: TransactionCardProps) => {
    const { amount, status: transactionType, created_at } = data;
    return (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          background: "#FCFCFC",
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
                transactionType?.toLowerCase()?.includes("complet") ||
                transactionType?.toLowerCase()?.includes("success")
                  ? "#47B48E1A"
                  : transactionType?.toLowerCase()?.includes("pending")
                  ? alpha("#ffe51dff", 0.3)
                  : alpha("#EE1616", 0.1),
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={
                transactionType?.toLowerCase()?.includes("complet") ||
                transactionType?.toLowerCase()?.includes("success")
                  ? CreditImage
                  : DebitImage
              }
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
                  transactionType?.toLowerCase()?.includes("complet") ||
                  transactionType?.toLowerCase()?.includes("success")
                    ? theme.palette.success.main
                    : transactionType?.toLowerCase()?.includes("pending")
                    ? theme.palette.warning.main
                    : theme.palette.error.main,
              }}
            >
              {transactionType}
            </Typography>
          </Box>
        </Box>
        <Typography variant="subtitle2">
          {dayjs(created_at).format("MMM Do YY")}
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
            display: "none",
            background: theme.palette.grey[100],
            "&:hover": { background: theme.palette.grey[200] },
          }}
        >
          Download History
        </Button>
      </Box>
      <Box
        sx={{
          my: 1,
          // maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        {data?.recent_transactions?.slice(0, 10)?.map((item) => (
          <TransactionCard key={item?.id} data={item} />
        ))}
      </Box>
    </Box>
  );
};

export default RecentTransactions;
