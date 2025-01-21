import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import LogsImg from "src/assets/icons/news.svg";
import PauseImg from "src/assets/icons/pause.svg";
import SubscriptionImg from "src/assets/icons/credit-card-validation.svg";
import DeleteImg from "src/assets/icons/delete-02.svg";
import { GLOBAL_COLORS } from "src/utils";

const sizing = { xs: 12, sm: 4, md: 3 };
type ButtonBoxProps = {
  title: string;
  image: string;
};
const ButtonBox = ({ title, image }: ButtonBoxProps) => {
  const theme = useTheme();
  return (
    <Box
      role="button"
      sx={{
        borderRadius: "6px",
        my: 0.6,
        height: "42px",
        display: "flex",
        gap: 0.9,
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "#ffffff",
        "&:hover": {
          background: theme.palette.grey[300],
        },
      }}
    >
      <img src={image} alt={title} style={{ width: "16px", height: "16px" }} />
      <Typography sx={{ fontSize: "14px" }}>{title}</Typography>
    </Box>
  );
};
function QuickActions() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "20px",
      }}
    >
      <Typography gutterBottom>Quick Actions</Typography>
      <Box
        sx={{
          my: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <ButtonBox title="Suspend" image={PauseImg} />
          </Grid>
          <Grid size={sizing}>
            <ButtonBox title="Subscription" image={SubscriptionImg} />
          </Grid>
          <Grid size={sizing}>
            <ButtonBox title="Logs" image={LogsImg} />
          </Grid>
          <Grid size={sizing}>
            <Box
              role="button"
              sx={{
                borderRadius: "6px",
                my: 0.6,
                height: "42px",
                display: "flex",
                gap: 0.5,
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "#EE4F160D",
                "&:hover": {
                  background: theme.palette.common.white,
                },
              }}
            >
              <img
                src={DeleteImg}
                alt={"Delete Account"}
                style={{ width: "16px", height: "16px" }}
              />
              <Typography
                sx={{ fontSize: "14px", color: theme.palette.error.main }}
              >
                {"Delete Account"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default QuickActions;
