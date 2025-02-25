import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GLOBAL_COLORS } from "src/utils";

type ProfileInfoBoxProps = {
  value: string;
  title: string;
};
const ProfileInfoBox = ({ value, title }: ProfileInfoBoxProps) => {
  return (
    <Box sx={{ my: 1 }}>
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            color: GLOBAL_COLORS.GRAY_800,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "17px",
            fontWeight: 500,
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileInfoBox;
