import { ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "src/assets/images/logo2.png";
// import useAuthStore from "src/store/authStore";
import { getAuthToken, isAuthTokenExpired } from "src/utils";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
type Props = {
  title: string;
  children: ReactNode;
};
const LoginLayout = ({ children, title }: Props) => {
  // const { handleLogin } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (token && !isAuthTokenExpired()) {
      navigate(ADMIN_ROUTE_LINKS.ADMIN_OVERVIEW, { replace: true });
    }
  }, []);
  return (
    <Box
      sx={{
        pt: 3,
        background: "#FBFBFB",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1,
          mb: 2,
        }}
      >
        <img
          src={Logo}
          alt="Hazcentro"
          style={{ width: "80px", height: "80px", marginBottom: "20px" }}
        />
        <Typography
          sx={{ textAlign: "center", fontSize: "16px", color: "GrayText" }}
        >
          Welcome to Hazcentro
        </Typography>
        <Typography
          gutterBottom
          sx={{
            textAlign: "center",
            fontSize: { xs: "16px", sm: "20px", md: "26px" },
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ minHeight: "65vh" }}>{children}</Box>
    </Box>
  );
};

export default LoginLayout;
