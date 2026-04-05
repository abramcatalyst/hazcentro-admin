import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";

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
import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";

// import { MdOutlineCancel } from "react-icons/md";
type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
};
// {
//     "question": "What is your shipping policy?",
//     "answer": "We offer standard and express shipping options...",
//     "order": 1,
//     "is_active": true
// }
function SendMessageDialog({ open, title, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  let initialValues = {
    message: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();

      try {
        helpers.setSubmitting(true);
        const res = await axios.post(`${baseUrl}/admin/faqs`, values);
        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FAQS],
        });
        toast.success(formatSuccessMessage(res?.data));
        handleClose();
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);

        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      message: yup.string().required().label("Message"),
    }),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;
  return (
    <StyledDialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
            {title}
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
              <InputLabel>Enter your message</InputLabel>
              <OutlinedInput
                label="Enter your message"
                multiline
                rows={6}
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.message && errors.message && (
                <FormHelperText error>{errors.message}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box
            sx={{ my: 3, display: "flex", gap: 1, justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                height: "55px",
                minWidth: { xs: "150px", sm: "184px" },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing" : "Publish"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default SendMessageDialog;
