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
import { GrStatusInfo } from "react-icons/gr";
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
};
// {
//     "question": "What is your shipping policy?",
//     "answer": "We offer standard and express shipping options...",
//     "order": 1,
//     "is_active": true
// }
function AddFAQsDialog({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  let initialValues = {
    question: "",
    answer: "",
    order: 1,
    is_active: true,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();

      try {
        helpers.setSubmitting(true);
        const res = await axios.post(`${baseUrl}/admin/faqs`, values);
        console.log("xxxxxxxxxxxxxxxxxxxxxxx", res?.data);
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
      answer: yup.string().required().label("Answer"),
      question: yup.string().required().label("Question"),
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
            Add FAQ
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
              <InputLabel>Enter Question</InputLabel>
              <OutlinedInput
                label="Enter Question"
                name="question"
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.question && errors.question && (
                <FormHelperText error>{errors.question}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Enter the Answer</InputLabel>
              <OutlinedInput
                label="Enter the Answer"
                multiline
                rows={6}
                name="answer"
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.answer && errors.answer && (
                <FormHelperText error>{errors.answer}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box>
              <GrStatusInfo style={{ color: theme.palette.info.main }} />
            </Box>
            <Typography fontSize={"13px"}>
              Note: All changes or modifications made to this effect will be
              available in the next launch of the User App.
            </Typography>
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
export default AddFAQsDialog;
