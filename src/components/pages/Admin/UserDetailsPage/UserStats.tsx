import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { currencyFormater } from "src/utils";

const sizing = { xs: 6, md: 3 };
type StatsBoxProps = {
  title: string;
  value: string | number;
  addNairaSign?: boolean;
  borderStyleColor: "GREEN" | "YELLOW" | "BLUE";
};
const UserStats = () => {
  const theme = useTheme();
  const StatsBox = ({
    title,
    value,
    addNairaSign,
    borderStyleColor,
  }: StatsBoxProps) => {
    const renderBorderColor = () => {
      if (borderStyleColor === "BLUE") {
        return "#598DB5";
      }
      if (borderStyleColor === "YELLOW") {
        return "#D9AA2A";
      }
      return "#59B562";
    };
    return (
      <Box sx={{ borderLeft: `4px solid ${renderBorderColor()}`, pl: 1.5 }}>
        <Box sx={{ my: 2 }}>
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "15px", sm: "20px" },
              fontWeight: 600,
            }}
          >
            {addNairaSign ? <> &#8358;</> : null} {currencyFormater(value)}
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: "12px",

              color: theme.palette.grey[800],
            }}
          >
            {title}
          </Typography>{" "}
        </Box>
      </Box>
    );
  };
  return (
    <Box
      component={Paper}
      sx={{ p: 1, borderRadius: "12px", mb: 2 }}
      elevation={0}
    >
      <Grid container spacing={1}>
        <Grid size={sizing}>
          <StatsBox
            addNairaSign
            value={240360}
            title="Total Amount Escr."
            borderStyleColor="GREEN"
          />
        </Grid>
        <Grid size={sizing}>
          <StatsBox
            value={2460}
            title="Total Units Ordered"
            borderStyleColor="YELLOW"
          />
        </Grid>
        <Grid size={sizing}>
          <StatsBox value={30} title="Total Order" borderStyleColor="BLUE" />
        </Grid>
        <Grid size={sizing}>
          <StatsBox value={3} title="Active Order" borderStyleColor="BLUE" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserStats;
