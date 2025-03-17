import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import Logo from "src/assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE_LINKS,
  CUSTOMER_ROUTE_LINKS,
  GLOBAL_ROUTE_LINKS,
} from "src/utils/routeLinks";
import useAuthStore from "src/store/authStore";

const NotFoundPage = () => {
  const profile = useAuthStore((state) => state.profile);
  const navigate = useNavigate();
  return (
    <Box>
      <MetaDecorator title=" Page Not Found" />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <img src={Logo} alt="logo" width={90} height={90} />
        <Typography gutterBottom variant="h5" fontWeight={600}>
          Sorry, Page Not Found
        </Typography>
        <Typography gutterBottom>
          The resource you are requesting for does not exist...{" "}
        </Typography>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            if (!profile) {
              navigate(GLOBAL_ROUTE_LINKS.LOGIN);
            }
            if (profile && profile?.role === "admin") {
              navigate(ADMIN_ROUTE_LINKS.ADMIN_OVERVIEW);
            }
            if (profile && profile?.role !== "admin") {
              navigate(CUSTOMER_ROUTE_LINKS.CUSTOMER_OVERVIEW);
            }
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
