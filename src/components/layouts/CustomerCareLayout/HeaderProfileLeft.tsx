import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import useAuthStore from "src/store/authStore";

function HeaderProfileLeft() {
  const { profile } = useAuthStore();

  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <Box>
        <Typography sx={{ color: "#000000", fontSize: "17px", mb: -0.2 }}>
          {`Hi, ${profile?.name}`}
        </Typography>
        <Typography sx={{ color: "GrayText", fontSize: "14px" }}>
          {dayjs().format("dddd, DD YYYY")}
        </Typography>
      </Box>
    </Box>
  );
}

export default HeaderProfileLeft;
