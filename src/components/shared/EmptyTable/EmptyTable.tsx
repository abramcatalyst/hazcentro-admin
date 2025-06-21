import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import { useTheme } from "@mui/material";
import EmptyImage from "src/assets/images/empty.png";

type Props = {
  subText: string;
  mainText?: string;
  isSmall?: boolean;
};
const EmptyTable = ({
  subText = "Sorry, no records match your search",
  mainText = "No Records to Show Yet",
  isSmall,
}: Props) => {
  return (
    <Box
      sx={{
        minHeight: isSmall ? "160px" : "210px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <img
        src={EmptyImage}
        alt="empty data"
        style={{
          width: isSmall ? "70px" : "120px",
          height: isSmall ? "70px" : "120px",
          objectFit: "contain",
          margin: "5px auto",
        }}
      />

      <Typography
        gutterBottom
        variant="h4"
        fontSize={16}
        fontWeight={500}
        color="text.primary"
      >
        {mainText}
      </Typography>
      <Typography
        gutterBottom
        variant="h5"
        fontSize={14}
        color="text.secondary"
      >
        {subText}
      </Typography>
    </Box>
  );
};

export default EmptyTable;
