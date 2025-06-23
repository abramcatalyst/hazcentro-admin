import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import Logo from "src/assets/images/error.png";

type Props = {
  text?: string;
};
const HalfScreenError = ({
  text = "Sorry, An unexpected error occurred...",
}: Props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "35vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img
        src={Logo}
        alt="error"
        style={{
          width: "90px",
          height: "90px",
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

export default HalfScreenError;
