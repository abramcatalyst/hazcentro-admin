import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { baseUrl, formatErrorMessage, formatSuccessMessage } from "src/utils";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import { useQueryClient } from "@tanstack/react-query";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { nigeriaStates } from "src/utils/NigeriaStates";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const sizing = { xs: 12, sm: 6 };

function AddDropInfoDialog({ open, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();
  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      state: "",
      country: "Nigeria",
      zip_code: "",
      phone_number: "",
      latitude: 0.0,
      longitude: 0.0,
      is_default: false,
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, helpers) => {
      try {
        // values.is_default = values.is_default == 'true' ? true: false
        values.is_default = Boolean(values.is_default);
        const { data } = await axios.post(
          `${baseUrl}/agents/drop-information`,
          values
        );
        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_AGENT_DROP_INFORMATION],
        });
        toast.success(formatSuccessMessage(data));
        handleClose();
        // console.log("xxxxxxxxxxxxxxxxxxxxxxx", res?.data?.access_token);
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);
        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      address: yup.string().required().label("Address"),
      city: yup.string().required().label("City"),
      state: yup.string().required().label("State"),
      zip_code: yup.string().required().label("Zip Code"),
      phone_number: yup.string().required().label("Phone number"),
    }),
  });

  const {
    isSubmitting,
    errors,
    values,
    touched,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = formik;

  const renderLGAs = () => {
    const found = nigeriaStates.find(
      (item) => item.states.name === values.state
    );

    if (!values.state || !found) {
      return null;
    }
    return (
      <FormControl fullWidth sx={{ my: 0.5 }}>
        <InputLabel>Select City</InputLabel>
        <Select
          label="Select City"
          name="city"
          value={values.city}
          onChange={handleChange}
        >
          {found &&
            found?.states?.locals?.map((item) => (
              <MenuItem key={item?.name} value={item?.name}>
                {item?.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
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
          <Typography variant="h6" sx={{ color: "GrayText" }}>
            Add Drop Information
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <Box
          sx={{
            mb: 1,
            p: { xs: 1, sm: 2 },
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ my: 0.5 }}>
              <InputLabel>Phone</InputLabel>
              <OutlinedInput
                label="Phone"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.phone_number && errors.phone_number && (
                <FormHelperText error>{errors.phone_number}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 0.5 }}>
              <InputLabel>Address</InputLabel>
              <OutlinedInput
                label="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.address && errors.address && (
                <FormHelperText error>{errors.address}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 0.5 }}>
              <InputLabel>State</InputLabel>
              <Select
                label="State"
                name="state"
                value={values.state}
                onChange={(e) => {
                  setFieldValue("state", e.target.value);
                  setFieldValue("city", "");
                }}
              >
                {nigeriaStates.map((item) => (
                  <MenuItem key={item?.states?.name} value={item?.states?.name}>
                    {item?.states?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {renderLGAs()}
            <Grid container spacing={1}>
              <Grid size={sizing}>
                <FormControl fullWidth>
                  <InputLabel>Zip code</InputLabel>
                  <OutlinedInput
                    label="Zip code"
                    name="zip_code"
                    value={values.zip_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.zip_code && errors.zip_code && (
                    <FormHelperText error>{errors.zip_code}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={sizing}>
                <FormControl>
                  <FormLabel>Use as default</FormLabel>
                  <RadioGroup
                    row
                    name="is_default"
                    value={values.is_default}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mb: 1, mt: 3 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                size="large"
                sx={{
                  borderRadius: "12px",
                  height: { xs: "50px", sm: "52px" },
                }}
              >
                {isSubmitting ? "Processing" : "Submit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default AddDropInfoDialog;
