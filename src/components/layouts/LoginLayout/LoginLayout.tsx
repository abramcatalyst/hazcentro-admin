import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "src/assets/images/logo2.png";
type Props = {
  title: string;
  children: ReactNode;
};
const LoginLayout = ({ children, title }: Props) => {
  return (
    <Box
      sx={{
        pt: 3,
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
