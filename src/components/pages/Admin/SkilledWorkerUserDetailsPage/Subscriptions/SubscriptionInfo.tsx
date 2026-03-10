import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BgImage from "src/assets/images/account-bg.png";
import CardBg from "src/assets/images/card.png";
import Logo from "src/assets/images/logo.png";
import { useTheme } from "@mui/material/styles";
const SubscriptionInfo = () => {
  const theme = useTheme();

  const SubscriptionStatus = () => {
    return (
      <Box
        sx={{
          background: "#ffffff",
          py: 0.6,
          px: 1.6,
          borderRadius: "25px",
          alignSelf: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Box
            sx={{
              background: theme.palette.error.main,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.error.main,
            }}
          >
            Not Active
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        mb: 1,
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box
        my={1}
        sx={{
          background: `url(${BgImage})`,
          height: "230px",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          pl: { xs: 0.5, sm: 3 },
          pr: { xs: 0.5, sm: 2 },
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
                fontWeight: 500,
                textAlign: "right",
                fontSize: { xs: "17px", sm: "22px" },
              }}
            >
              Premium <br /> Users
            </Typography>
          </Box>
        </Box>
        <SubscriptionStatus />
      </Box>
    </Box>
  );
};

export default SubscriptionInfo;
