import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
// import ViewImg from "src/assets/icons/view-off.svg";
import PauseImg from "src/assets/icons/pause.svg";
import RepeatOff from "src/assets/icons/repeat-off.svg";
// import DeleteImg from "src/assets/icons/delete-02.svg";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  GLOBAL_COLORS,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserType } from "src/types/users";
import { useQueryClient } from "@tanstack/react-query";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";

const sizing = { xs: 12, sm: 6 };
type ButtonBoxProps = {
  title: string;
  image: string;
  disabled?: boolean;
  handleClick: () => void;
};
const ButtonBox = ({ title, image, disabled, handleClick }: ButtonBoxProps) => {
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
        pointerEvents: disabled ? "none" : "auto",
        "&:hover": {
          background: disabled ? "none" : theme.palette.grey[300],
        },
      }}
      onClick={() => {
        handleClick();
      }}
    >
      <img src={image} alt={title} style={{ width: "16px", height: "16px" }} />
      <Typography sx={{ fontSize: "14px" }}>
        {disabled ? "Processing" : title}
      </Typography>
    </Box>
  );
};
type Props = {
  selected: UserType;
  handleClose: () => void;
  queries: string[];
};
function QuickActions({ selected, queries, handleClose }: Props) {
  const [openSuspendDialog, setOpenSuspendDialog] = useState(false);
  const [openFrezeDialog, setOpenFrezeDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleCloseSuspendDialog = () => {
    setOpenSuspendDialog(false);
  };
  const handleOpenSuspendDialog = () => {
    setOpenSuspendDialog(true);
  };

  const handleCloseFreezedDialog = () => {
    setOpenFrezeDialog(false);
  };
  const handleOpenFreezedDialog = () => {
    setOpenFrezeDialog(true);
  };
  const handleSubmitUpdateStatus = async ({
    val,
    onSuccess,
  }: {
    val: "active" | "suspended" | "inactive";
    onSuccess: () => void;
  }) => {
    // 'pending', 'approved', 'declined', 'none'
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const payload = {
        status: val,
      };
      const res = await axios.patch(
        `${baseUrl}/admin/users/${selected?.id}`,
        payload
      );
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);

      await queryClient.invalidateQueries({
        queryKey: queries,
      });
      onSuccess();
      handleClose();
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSubmitSuspend = () => {
    handleSubmitUpdateStatus({
      val: selected?.status === "active" ? "suspended" : "active",
      onSuccess: handleCloseSuspendDialog,
    });
  };
  const handleSubmitFreeze = () => {
    handleSubmitUpdateStatus({
      val: "inactive",
      onSuccess: handleCloseFreezedDialog,
    });
  };

  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "20px",
      }}
    >
      {openSuspendDialog && (
        <GeneralConfirmDialog
          hint={`Do you realy want to ${
            selected?.status === "active" ? "suspend" : "activate"
          } ${selected?.name}'s account? `}
          isSubmitting={isSubmitting}
          open={openSuspendDialog}
          handleClose={handleCloseSuspendDialog}
          handleSubmit={handleSubmitSuspend}
        />
      )}
      {openFrezeDialog && (
        <GeneralConfirmDialog
          hint={`Do you realy want to freeze ${selected?.name}'s account? `}
          isSubmitting={isSubmitting}
          open={openFrezeDialog}
          handleClose={handleCloseFreezedDialog}
          handleSubmit={handleSubmitFreeze}
        />
      )}
      <Typography gutterBottom>Quick Actions</Typography>
      <Box
        sx={{
          my: 1,
        }}
      >
        <Grid container spacing={1}>
          {/* <Grid size={sizing}>
            <ButtonBox title="Hide Catalog" image={ViewImg} />
          </Grid> */}
          <Grid size={sizing}>
            <ButtonBox
              title={selected?.status === "active" ? "Suspend" : "Activate"}
              image={PauseImg}
              disabled={isSubmitting}
              handleClick={handleOpenSuspendDialog}
            />
          </Grid>
          <Grid size={sizing}>
            <ButtonBox
              title="Freeze"
              image={RepeatOff}
              disabled={isSubmitting}
              handleClick={handleOpenFreezedDialog}
            />
          </Grid>
          {/* <Grid size={sizing}>
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
                alt={"Delete"}
                style={{ width: "16px", height: "16px" }}
              />
              <Typography
                sx={{ fontSize: "14px", color: theme.palette.error.main }}
              >
                {"Delete"}
              </Typography>
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}
export default QuickActions;
