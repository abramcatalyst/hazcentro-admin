// import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
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
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import useAuthStore from "src/store/authStore";
import { useNavigate } from "react-router-dom";
import { GLOBAL_ROUTE_LINKS } from "src/utils/routeLinks";
// import { MdOutlineCancel } from "react-icons/md";
type Props = {
  open: boolean;
  handleClose: () => void;
};

function ChangePasswordDialog({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { handleLogout } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        setDefaultHeaders();
        const res = await axios.put(
          `${baseUrl}/admin/account/password/change`,
          values
        );

        toast.success(formatSuccessMessage(res?.data));
        handleClose();

        handleLogout();
        navigate(GLOBAL_ROUTE_LINKS.LOGIN);
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);
        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      current_password: yup.string().required().label("Current Password"),
      new_password: yup.string().min(6).required().label("Password"),
      new_password_confirmation: yup
        .string()
        .min(6)
        .label("Password")
        .required("Confirm password is required")
        .oneOf([yup.ref("new_password")], "Passwords must match"),
    }),
  });

  const {
    isSubmitting,
    errors,
    values,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;
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
        <Box component={"form"} onSubmit={handleSubmit}>
          <Box>
            <FormControl fullWidth sx={{ my: 1 }}>
              <StyledFormLabel>Enter Old Password</StyledFormLabel>
              <StyledOutlinedInput
                placeholder="Enter Old Password"
                value={values.current_password}
                name="current_password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors?.current_password && touched?.current_password ? (
                <FormHelperText error>
                  {errors?.current_password}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <StyledFormLabel>Enter New Password</StyledFormLabel>
              <StyledOutlinedInput
                placeholder="Enter New Password"
                value={values.new_password}
                name="new_password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors?.new_password && touched?.new_password ? (
                <FormHelperText error>{errors?.new_password}</FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <StyledFormLabel>Confirm New Password</StyledFormLabel>
              <StyledOutlinedInput
                placeholder="Confirm New Password"
                value={values.new_password_confirmation}
                name="new_password_confirmation"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors?.new_password_confirmation &&
              touched?.new_password_confirmation ? (
                <FormHelperText error>
                  {errors?.new_password_confirmation}
                </FormHelperText>
              ) : null}
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
              type="submit"
              sx={{
                height: "55px",
                minWidth: { xs: "150px", sm: "184px" },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing" : "Change Password"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default ChangePasswordDialog;
