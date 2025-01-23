import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { GrStatusInfo } from "react-icons/gr";
const CreateItemNotification = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 0.5 }}>
      <Box>
        <GrStatusInfo style={{ color: theme.palette.info.main }} />
      </Box>
      <Typography fontSize={"13px"}>
        Note: All changes or modifications made to this effect will be available
        in the next launch of the User App.
      </Typography>
    </Box>
  );
};

export default CreateItemNotification;
