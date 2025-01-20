import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material";
import { GLOBAL_COLORS } from "src/utils";

const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    outlineColor: "#0D0F0F",
    borderColor: "#0D0F0F",
  },
  "& .MuiOutlinedInput-input": {
    outlineColor: "#0D0F0F",
    borderColor: "#0D0F0F",
  },
  "&:hover": {
    borderColor: GLOBAL_COLORS.GREEN_LIGHT,
    outlineColor: GLOBAL_COLORS.GREEN_LIGHT,
  },
  "&:focus": {
    borderColor: GLOBAL_COLORS.GREEN_LIGHT,
    outlineColor: GLOBAL_COLORS.GREEN_LIGHT,
  },
  fontSize: "14px",
  // marginBottom: 5,
  borderColor: "#0D0F0F",

  background:
    theme.palette.mode === "dark" ? "#0D0F0F" : theme.palette.common.white,
}));

export default StyledOutlinedInput;
