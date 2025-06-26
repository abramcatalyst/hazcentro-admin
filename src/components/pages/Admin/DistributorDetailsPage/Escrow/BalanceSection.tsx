import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { currencyFormater } from "src/utils";
import { EscrowResType } from "src/types/escrow";

const sizing = {
  xs: 12,
  sm: 6,
};

type CardItemProps = {
  title: string;
  subTitle: string;
  value: string | number;
  addNairaSign?: boolean;
  addNumberFormatting?: boolean;
};
const CardItem = ({
  title,
  subTitle,
  value,
  addNairaSign,
  addNumberFormatting = true,
}: CardItemProps) => {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.grey[200]}` }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontSize: "15px", lineHeight: "100%", fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Box mt={1}>
          <Typography
            sx={{
              color: "GrayText",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {subTitle}
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography sx={{ fontWeight: 700, fontSize: "19px" }}>
            {addNairaSign && <>&#8358;</>}{" "}
            {addNumberFormatting ? currencyFormater(value, 2) : value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

type Props = {
  data: EscrowResType;
};
function BalanceSection({ data }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px",
        py: 1,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Grid container spacing={1}>
        <Grid size={sizing}>
          <CardItem
            title="Balance"
            subTitle={`Active Escrow Order ${data?.summary?.active_escrow_count}`}
            value={data?.summary?.balance}
            addNairaSign
            addNumberFormatting={false}
          />
        </Grid>
        <Grid size={sizing}>
          <CardItem
            title="Incomming Payment"
            subTitle={`Total Payout`}
            value={data?.summary?.incoming_payment_count}
          />
        </Grid>
        <Grid size={sizing}>
          <CardItem
            title="Dispute Log"
            subTitle={`Total Logs`}
            value={data?.summary?.dispute_log_count}
          />
        </Grid>
        <Grid size={sizing}>
          <CardItem
            title="Delivered Amount"
            subTitle={`Past Payout`}
            value={data?.summary?.delivered_amount}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
export default BalanceSection;
