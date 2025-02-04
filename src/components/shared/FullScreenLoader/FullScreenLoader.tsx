import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Logo from "src/assets/images/logo.png";

type Props = {
  text?: string;
};
const FullScreenLoader = ({ text = "Loading..." }: Props) => {
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
          width: "150px",
          height: "150px",
          objectFit: "contain",
          margin: "5px auto",
        }}
      />
      <br />
      <Typography
        gutterBottom
        variant="h5"
        fontSize={16}
        fontWeight={500}
        // color="text.primary"
        textAlign={"center"}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default FullScreenLoader;
