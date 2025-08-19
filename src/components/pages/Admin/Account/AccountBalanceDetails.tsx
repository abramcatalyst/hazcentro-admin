import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Coins from "src/assets/images/coins.png";
import { currencyFormater } from "src/utils";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import { SettingsSummaryType } from "src/types/settings";

dayjs.extend(advancedFormat);
const sizing = { xs: 12, sm: 6 };
type BalanceCardProps = {
  title: string;
  value: string | number;
};
type Props = {
  data: SettingsSummaryType;
};
const AccountBalanceDetails = ({ data }: Props) => {
  const theme = useTheme();
  const BalanceCard = ({ title, value }: BalanceCardProps) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          background: theme.palette.common.white,
          py: 1.5,
          px: 0.7,
          borderRadius: "16px",
        }}
      >
        <img
          src={Coins}
          alt="coins"
          style={{ width: "60px", height: "60px" }}
        />
        <Box>
          <Typography sx={{ fontSize: "14px", color: "GrayText" }}>
            {title}
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
            &#8358;{currencyFormater(value)}
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "GrayText" }}>
            Total Funds - 901,823.43
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        m: 1,
        mb: 1,
        p: { xs: 1, sm: 2 },
        background: theme.palette.grey[50],
        borderRadius: "16px",
      }}
    >
      <Box>
        <Typography pl={1} gutterBottom>
          {dayjs().format("MMMM Do, YYYY")}
        </Typography>
      </Box>

      <Box sx={{ my: 2 }}>
        <Grid container spacing={2}>
          <Grid size={sizing}>
            <BalanceCard title="E-Commerce" value={data?.e_commerce_sales} />
          </Grid>
          <Grid size={sizing}>
            <BalanceCard
              title="Sub - Service App"
              value={data?.service_app_revenue}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccountBalanceDetails;
