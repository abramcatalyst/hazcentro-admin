import Grid from "@mui/material/Grid2";
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
import { SettingsType } from "src/types/settings";

type Props = {
  open: boolean;
  data: SettingsType;
  handleClose: () => void;
};

function ContactWhatsappDialog({ open, data, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();

  let initialValues = {
    whatsapp_line: data?.whatsapp_line?.value || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();
      let payload = {
        key: data?.whatsapp_line?.key,
        value: [values.whatsapp_line],
      };
      try {
        helpers.setSubmitting(true);
        const res = await axios.put(`${baseUrl}/admin/setting`, payload);

        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS],
        });
        toast.success(formatSuccessMessage(res?.data));
        helpers.resetForm();
        handleClose();
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);

        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      whatsapp_line: yup.string().required().label("Amount"),
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
          <Typography variant="h6" sx={{}}>
            Whatsapp Phone Number
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <Box>
          <Box>
            <Box component={"form"} onSubmit={handleSubmit}>
              <Box>
                <Grid container spacing={1}>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth sx={{ my: 1 }}>
                      <InputLabel>Enter phone number</InputLabel>
                      <OutlinedInput
                        label="Enter phone number"
                        name="whatsapp_line"
                        value={values.whatsapp_line}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.whatsapp_line && errors.whatsapp_line ? (
                        <FormHelperText error>
                          {errors.whatsapp_line}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  my: 3,
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    minWidth: { xs: "150px", sm: "184px" },
                  }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing" : "Submit"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default ContactWhatsappDialog;
