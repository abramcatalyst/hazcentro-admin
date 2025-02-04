import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import Logo from "src/assets/images/error.png";

type Props = {
  text?: string;
};
const FullScreenError = ({
  text = "Sorry, An unexpected error occurred...",
}: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img
        src={Logo}
        alt="empty data"
        style={{
          width: "110px",
          height: "110px",
          objectFit: "contain",
          margin: "5px auto",
        }}
      />
      <Typography
        gutterBottom
        variant="h5"
        fontWeight={500}
        textAlign={"center"}
        sx={{
          color: theme.palette.error.main,
        }}
      >
        An Error Occurred
      </Typography>
      <br />
      <Typography
        gutterBottom
        variant="h5"
        fontSize={16}
        fontWeight={500}
        textAlign={"center"}
        sx={{
          color:
            theme.palette.mode === "light"
              ? theme.palette.common.black
              : theme.palette.common.white,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default FullScreenError;
