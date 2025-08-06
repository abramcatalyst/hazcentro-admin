import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@mui/material/styles";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";

import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { FAQType } from "src/types/faqs";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import CreateItemNotification from "src/components/shared/CreateItemNotification/CreateItemNotification";

type Props = {
  open: boolean;
  selected: FAQType;
  handleClose: () => void;
};

function EditFAQDialog({ open, selected, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();
  let initialValues = {
    question: selected?.question || "",
    answer: selected?.answer || "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();

      try {
        helpers.setSubmitting(true);
        const res = await axios.put(
          `${baseUrl}/admin/faqs/${selected?.id}`,
          values
        );

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
            Edit FAQ
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
                name="name"
                value={values.question}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Enter Question"
              />
              {touched.question && errors.question && (
                <FormHelperText error>{errors.question}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Enter the Answer</InputLabel>
              <OutlinedInput
                multiline
                rows={6}
                name="answer"
                value={values.answer}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Enter the Answer"
              />
              {touched.answer && errors.answer && (
                <FormHelperText error>{errors.answer}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <CreateItemNotification />
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
              {isSubmitting ? "Processing" : "Update"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default EditFAQDialog;
