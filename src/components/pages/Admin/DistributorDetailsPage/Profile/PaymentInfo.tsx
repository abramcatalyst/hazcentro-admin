import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const PaymentInfo = () => {
  return (
    <Box my={2}>
      <Grid container spacing={1}>
        <Grid size={sizing}>
          <ProfileInfoBox title="Payment Method" value="VIA TRANSFER" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="NUBAN" value="73434562345" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Bank" value="Zenith Bank Plc" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentInfo;
