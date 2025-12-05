import { useMemo, useState } from "react";
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
import FormLabel from "@mui/material/FormLabel";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { useTheme } from "@mui/material/styles";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";

import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  safeJSONParse,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { SettingsType } from "src/types/settings";

type Props = {
  open: boolean;
  data: SettingsType | null;
  handleClose: () => void;
};

function ContactEmailDialog({ open, data, handleClose }: Props) {
  const [submitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();
  let initialValues = {
    email: "",
  };
  let emailList: string[] = useMemo(() => {
    let items: string[] = [];
    if (data && data?.contact_emails) {
      items = safeJSONParse(data?.contact_emails?.value) || [];
    }
    return items;
  }, [data, open]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();
      let payload = {
        key: data?.contact_emails?.key,
        value: [...emailList, values.email],
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
      email: yup.string().required().label("Email"),
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

  const handleRemoveEmail = async (val: string) => {
    setDefaultHeaders();
    const emailValues = emailList?.filter((item) => item !== val) || [];
    let payload = {
      key: data?.contact_emails?.key,
      value: emailValues,
    };
    try {
      setIsSubmitting(true);
      const res = await axios.put(`${baseUrl}/admin/setting`, payload);

      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS],
      });
      toast.success(formatSuccessMessage(res?.data));
      // handleClose();
    } catch (error) {
      setIsSubmitting(false);
      let errMsg = formatErrorMessage(error);

      return toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
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
            Email Contact
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
            <FormControl size="small" fullWidth sx={{ my: 1 }}>
              <FormLabel>Add Email</FormLabel>
              <OutlinedInput
                placeholder="Enter the email address here"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>
          </Box>
          {emailList && emailList?.length > 0 ? (
            <Box>
              <Typography sx={{ fontSize: "14px", fontWeight: 500, my: 1 }}>
                Added Emails
              </Typography>
              <Box
                sx={{
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {emailList?.map((item) => (
                  <Box
                    key={item}
                    sx={{
                      border: `1px solid #eeeeee`,
                      px: 1,
                      py: 0.3,
                      display: "flex",
                      gap: 0.7,
                      alignItems: "center",
                      borderRadius: "6px",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>{item}</Typography>
                    <IconButton
                      disabled={submitting}
                      size="small"
                      color="error"
                      onClick={() => {
                        handleRemoveEmail(item);
                      }}
                    >
                      <RemoveCircleOutlineRoundedIcon
                        style={{ fontSize: "17px" }}
                      />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography sx={{ textAlign: "center", my: 2 }}>
                No emails added yet
              </Typography>
            </Box>
          )}
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
              disabled={isSubmitting || submitting}
            >
              {isSubmitting ? "Processing" : "Submit"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default ContactEmailDialog;
