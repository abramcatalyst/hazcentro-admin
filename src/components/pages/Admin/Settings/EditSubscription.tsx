import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
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
import { SubscriptionType } from "src/types/subscriptions";

type Props = {
  selectedSubscription: SubscriptionType;
  handleClose: () => void;
};
const sizing = { xs: 12, sm: 6, md: 4 };

function EditSubscription({ selectedSubscription, handleClose }: Props) {
  const queryClient = useQueryClient();

  let initialValues = {
    name: selectedSubscription?.name || "",
    price: selectedSubscription?.price || 10,
    status: selectedSubscription?.status || "active",
    description: selectedSubscription?.description || "",
    type: selectedSubscription?.type || "monthly", //montly or yearly
    user_type: selectedSubscription?.user_type || "worker", //worker or vendor
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();

      try {
        helpers.setSubmitting(true);
        const res = await axios.put(
          `${baseUrl}/admin/subscriptions/${selectedSubscription?.id}`,
          values
        );

        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SUBSCRIPTION_PLANS],
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
      name: yup.string().required().label("Name"),
      price: yup.number().positive().required().label("price"),
      description: yup.string().required().label("Description"),
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
    <Box>
      <Box>
        <Typography sx={{ pl: 1, mt: 1, mb: 2, fontWeight: 600 }}>
          Update Subscription
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Box>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12 }}>
                <FormControl size="small" fullWidth sx={{ my: 1 }}>
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <FormHelperText error>{errors.name}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControl size="small" fullWidth sx={{ my: 1 }}>
                  <InputLabel>Price</InputLabel>
                  <OutlinedInput
                    label="Price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.price && errors.price && (
                    <FormHelperText error>{errors.price}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={sizing}>
                <FormControl size="small" fullWidth>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup
                    row
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio size="small" />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio size="small" />}
                      label="Not Active"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={sizing}>
                <FormControl size="small" fullWidth>
                  <FormLabel>User Type</FormLabel>
                  <RadioGroup
                    row
                    name="user_type"
                    value={values.user_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="worker"
                      control={<Radio size="small" />}
                      label="Worker"
                    />
                    <FormControlLabel
                      value="vendor"
                      control={<Radio size="small" />}
                      label="Vendor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid size={sizing}>
                <FormControl size="small" fullWidth>
                  <FormLabel>Duration Type</FormLabel>
                  <RadioGroup
                    row
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="monthly"
                      control={<Radio size="small" />}
                      label="Monthly"
                    />
                    <FormControlLabel
                      value="yearly"
                      control={<Radio size="small" />}
                      label="Yearly"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl size="small" fullWidth sx={{ my: 1 }}>
                  <InputLabel>Description</InputLabel>
                  <OutlinedInput
                    label="Description"
                    name="description"
                    multiline
                    rows={3}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error>{errors.description}</FormHelperText>
                  )}
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
  );
}
export default EditSubscription;
