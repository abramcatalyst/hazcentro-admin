// import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import { GrStatusInfo } from "react-icons/gr";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import StyledFormLabel from "src/components/shared/StyledFormLabel/StyledFormLabel";
import StyledOutlinedInput from "src/components/shared/StyledOutlinedInput/StyledOutlinedInput";
// import { MdOutlineCancel } from "react-icons/md";
type Props = {
  open: boolean;
  handleClose: () => void;
};

function ChangePasswordDialog({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledDialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="xs"
    >
      <DialogActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            px: { xs: 1, sm: 2 },
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: "GrayText" }}>
            Change Password
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <Box component={"form"}>
          <Box>
            <FormControl fullWidth sx={{ my: 1 }}>
              <StyledFormLabel>Enter Old Password</StyledFormLabel>
              <StyledOutlinedInput placeholder="Enter Old Password" />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <StyledFormLabel>Enter New Password</StyledFormLabel>
              <StyledOutlinedInput placeholder="Enter New Password" />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <StyledFormLabel>Confirm New Password</StyledFormLabel>
              <StyledOutlinedInput placeholder="Confirm New Password" />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: { xs: "100%", sm: "90%" },
              mx: "auto",
              mt: 2,
            }}
          >
            <Box>
              <GrStatusInfo style={{ color: theme.palette.info.main }} />
            </Box>
            <Typography fontSize={"13px"}>
              Note: a confirmation email will be send to the email address
              connected to the “SUPER ADMIN” profile.
            </Typography>
          </Box>

          <Box
            sx={{ my: 3, display: "flex", gap: 1, justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                height: "55px",
                minWidth: { xs: "150px", sm: "184px" },
              }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default ChangePasswordDialog;
