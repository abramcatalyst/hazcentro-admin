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
    // success: {
    //   main: "#009A2C",
    //   light: "#33ae56",
    //   dark: "#006b1e",
    // },
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
