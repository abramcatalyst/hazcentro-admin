import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { AiOutlineInfoCircle } from "react-icons/ai";

type Props = {
  text: string;
};
const LoginFormInfoSection = ({ text }: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        mt: 1,
        mb: 2,
        width: "100%",
      }}
    >
      <Typography fontSize={"15px"} fontWeight={600}>
        {text}
      </Typography>

      <AiOutlineInfoCircle
        style={{ color: theme.palette.success.light, fontSize: "20px" }}
      />
    </Box>
  );
};

export default LoginFormInfoSection;
