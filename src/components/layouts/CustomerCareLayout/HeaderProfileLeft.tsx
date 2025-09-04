import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import dayjs from "dayjs";
import { GLOBAL_COLORS } from "src/utils";
import useAuthStore from "src/store/authStore";

function HeaderProfileLeft() {
  const { profile } = useAuthStore();

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        gap: 1,
      }}
    >
      <Box>
        <Typography sx={{ color: "#000000", fontSize: "17px", mb: -0.2 }}>
          {`Hi, ${profile?.name}`}
        </Typography>
        <Typography sx={{ color: "GrayText", fontSize: "14px" }}>
          {dayjs().format("dddd, DD YYYY")}
        </Typography>
      </Box>
      <OutlinedInput
        size="small"
        sx={{
          borderRadius: "10px",
          "&:placeholder": { fontSize: "12px" },
          background: GLOBAL_COLORS.GREY_50,
          border: "none",
          width: "359px",
          height: "44px",
        }}
        placeholder="Search for info, data..."
      />
    </Box>
  );
}

export default HeaderProfileLeft;
