import { ThemeOptions } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { GLOBAL_COLORS } from "src/utils";

const options: ThemeOptions = {
  palette: {
    primary: {
      main: GLOBAL_COLORS.PRIMARY_MAIN,
      light: GLOBAL_COLORS.PRIMARY_LIGHT,
      dark: GLOBAL_COLORS.PRIMARY_DARK,
    },
    secondary: {
      main: GLOBAL_COLORS.SECONDARY_MAIN,
      light: GLOBAL_COLORS.SECONDARY_LIGHT,
      dark: GLOBAL_COLORS.SECONDARY_DARK,
    },
  },
  typography: {
    fontFamily: "'DM sans', 'Rubik', sans-serif",
    button: {
      textTransform: "none",
    },
  },
};
const theme = createTheme(options);
export default theme;
