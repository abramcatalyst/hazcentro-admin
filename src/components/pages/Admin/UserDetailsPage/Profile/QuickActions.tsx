import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import LogsImg from "src/assets/icons/news.svg";
import PauseImg from "src/assets/icons/pause.svg";
import Message from "src/assets/icons/message-multiple-01.svg";
import DeleteImg from "src/assets/icons/delete-02.svg";
import { useState } from "react";

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
        background: theme.palette.grey[100],
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const theme = useTheme();

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box
      sx={{
        my: 1,
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
            <ButtonBox title="Message" image={Message} />
          </Grid>
          <Grid size={sizing}>
            <ButtonBox title="Dispute Logs" image={PauseImg} />
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
              onClick={() => {
                handleOpenDeleteDialog();
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
      <Drawer
        anchor="bottom"
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        sx={{}}
      >
        <Box sx={{ my: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              <Box sx={{ maxWidth: "500px" }}>
                <Typography gutterBottom variant="h6" sx={{ fontWeight: 500 }}>
                  You can't undo this after deleting
                </Typography>
                <Divider />

                <Typography gutterBottom sx={{ fontWeight: 500, my: 1 }}>
                  Are you sure you want to delete "User Account"
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <Box>
                <Button
                  size="large"
                  color="inherit"
                  onClick={() => {
                    handleCloseDeleteDialog();
                  }}
                >
                  Cancel
                </Button>
                &nbsp; &nbsp;
                <Button size="large" color="error" variant="contained">
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Box>
  );
}
export default QuickActions;
