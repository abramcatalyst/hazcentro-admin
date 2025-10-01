import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";

import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import useManageToken from "src/hooks/useManageToken";
import { useParams } from "react-router-dom";
import { UserType } from "src/types/users";

type Props = {
  open: boolean;
  user: UserType;
  handleClose: () => void;
};
const options = [
  {
    value: "pending",
    title: "Pending",
  },
  {
    value: "approved",
    title: "Approved",
  },
  {
    value: "declined",
    title: "Declined",
  },
];
function UpdateKYCDialog({ open, user, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { logOutUser } = useManageToken();

  const formik = useFormik({
    initialValues: {
      kyc_status: user?.kyc_status || "pending",
    },
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      if (isAuthTokenExpired()) {
        logOutUser();
      }
      setDefaultHeaders();
      try {
        const res = await axios.patch(`${baseUrl}/admin/users/${id}`, values);

        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER],
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
      kyc_status: yup.string().required().label("Status"),
    }),
  });

  const { values, touched, errors, isSubmitting, handleChange, handleSubmit } =
    formik;
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
            Update KYC Status
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
            <FormControl>
              <FormLabel>Select Status</FormLabel>
              <RadioGroup
                row
                name="kyc_status"
                value={values.kyc_status}
                onChange={handleChange}
              >
                {options?.map((item) => (
                  <FormControlLabel
                    value={item?.value}
                    control={<Radio value={item?.value} />}
                    label={item?.title}
                  />
                ))}
              </RadioGroup>
              {errors?.kyc_status && touched?.kyc_status ? (
                <FormHelperText error>{errors?.kyc_status}</FormHelperText>
              ) : null}
            </FormControl>
          </Box>

          <Box
            sx={{
              mt: 7,
              mb: 3,
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={isSubmitting}
              sx={{
                height: "45px",
                minWidth: { xs: "150px", sm: "184px" },
              }}
            >
              {isSubmitting ? "Processing" : "Submit"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default UpdateKYCDialog;
