import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BgImage from "src/assets/images/account-bg.png";
import CardBg from "src/assets/images/card.png";
import Logo from "src/assets/images/logo.png";
import { currencyFormater } from "src/utils";
import CreateItemNotification from "src/components/shared/CreateItemNotification/CreateItemNotification";
import { useTheme } from "@mui/material/styles";
const AccountBalance = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        mb: 1,
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box>
        <Typography pl={1} gutterBottom>
          Super Admin
        </Typography>
      </Box>

      <Box
        my={1}
        sx={{
          background: `url(${BgImage})`,
          height: "230px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "flex-end",
          pl: { xs: 0.5, sm: 3 },
        }}
      >
        <Box
          sx={{
            background: `url(${CardBg})`,
            height: "156px",
            width: "100%",
            maxWidth: "270px",
            borderRadius: "20px",
            backgroundSize: "100% 100%",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              pl: 1,
              mt: 1,
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "43px", height: "43px" }}
            />
            <Typography fontWeight={600}>Hazcentro</Typography>
          </Box>
          <Box sx={{ pr: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textAlign: "right",
                fontSize: { xs: "20px", sm: "28px" },
              }}
            >
              &#8358;{currencyFormater(401000590)}
            </Typography>
            <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
              Available Balance
            </Typography>
          </Box>
        </Box>
      </Box>
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
        <CreateItemNotification />
        <Button
          color="inherit"
          size="small"
          sx={{
            background: theme.palette.grey[100],
            "&:hover": { background: theme.palette.grey[200] },
          }}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default AccountBalance;
