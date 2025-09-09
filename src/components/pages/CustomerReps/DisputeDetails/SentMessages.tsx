import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { SingleDisputeType } from "src/types/disputes";

type Props = {
  data: SingleDisputeType;
};
const SentMessages = ({ data }: Props) => {
  const theme = useTheme();
  console.log("ssssssssssssssssssssssssss", data, theme);
  return (
    <Box
      component={Paper}
      sx={{
        p: 1,
        borderRadius: "12px",
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        width: "100%",
      }}
      elevation={0}
    >
      <Typography variant="subtitle2">234812345612</Typography>
    </Box>
  );
};

export default SentMessages;
