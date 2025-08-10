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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
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
import CreateItemNotification from "src/components/shared/CreateItemNotification/CreateItemNotification";
import { SettingsType } from "src/types/settings";

type Props = {
  open: boolean;
  data: SettingsType | null;
  handleClose: () => void;
};
const options = [
  { title: "Weekly (saturdays)", value: "weekly (saturdays)" },
  { title: "Daily (After 24 hrs)", value: "daily (after 24 hrs)" },
  { title: "Monthly", value: "monthly" },
];
function PayoutPreferenceDialog({ open, data, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();
  let initialValues = {
    schedule: data?.payout_preference?.value || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();
      let payload = {
        key: "payout_preference",
        value: values.schedule,
      };
      try {
        helpers.setSubmitting(true);
        const res = await axios.put(`${baseUrl}/admin/setting`, payload);

        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS],
        });
        toast.success(formatSuccessMessage(res?.data));
        helpers.resetForm();
        // handleClose();
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);

        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      schedule: yup.string().required().label("Schedule"),
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
      maxWidth="md"
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
            Payout Preference
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
          <CreateItemNotification text="Note: All mail message will be sent to the official Hazcentro email “hazcetro@mail.com. You can change this setting below" />
        </Box>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Box>
            <FormControl size="small" fullWidth sx={{ my: 1 }}>
              <FormLabel>Choose payout schedule</FormLabel>
              <Select
                name="schedule"
                value={values.schedule}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {options.map((item) => (
                  <MenuItem key={item?.value} value={item?.value}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
              {touched.schedule && errors.schedule && (
                <FormHelperText error>{errors.schedule}</FormHelperText>
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
                minWidth: { xs: "150px", sm: "184px" },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing" : "Submit"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default PayoutPreferenceDialog;
