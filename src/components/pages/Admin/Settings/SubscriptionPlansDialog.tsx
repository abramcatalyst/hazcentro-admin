import { useState } from "react";
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
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
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
import CustomTab from "src/components/shared/CustomTab/CustomTab";
import ManageSubscriptions from "./ManageSubscriptions";
import { SubscriptionType } from "src/types/subscriptions";
import EditSubscription from "./EditSubscription";

type Props = {
  open: boolean;
  handleClose: () => void;
};
const sizing = { xs: 12, sm: 6, md: 4 };

const tabOptions = [
  { title: "Add Plan", value: "ADD" },
  { title: "Manage", value: "MANAGE" },
];
function SubscriptionPlansDialog({ open, handleClose }: Props) {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType | null>(null);

  const handleClick = (value: string) => {
    setSelectedTab(value);
  };

  const handleOpenEditDiscount = (value: SubscriptionType) => {
    setSelectedSubscription(value);
    setShowEditDiscount(true);
  };

  const handleCloseEditDiscount = () => {
    setSelectedSubscription(null);
    setShowEditDiscount(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();

  let initialValues = {
    name: "",
    price: 10,
    status: "active",
    description: "",
    type: "monthly", //montly or yearly
    user_type: "worker", //worker or vendor
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();

      try {
        helpers.setSubmitting(true);
        const res = await axios.post(`${baseUrl}/admin/subscriptions`, values);

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
            Suscription Plans
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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ pl: 2, display: "flex", gap: 1, mb: 2 }}>
            {tabOptions.map((item) => {
              return (
                <CustomTab
                  size="small"
                  key={item.value}
                  handleClick={handleClick}
                  value={item.value}
                  title={item.title}
                  active={item.value === selectedTab}
                />
              );
            })}
          </Box>
        </Box>
        {showEditDiscount && selectedSubscription ? (
          <>
            <EditSubscription
              selectedSubscription={selectedSubscription}
              handleClose={handleCloseEditDiscount}
            />
          </>
        ) : (
          <Box>
            {selectedTab === "ADD" && (
              <Box>
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
                            <FormHelperText error>
                              {errors.price}
                            </FormHelperText>
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
                            <FormHelperText error>
                              {errors.description}
                            </FormHelperText>
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
            )}
            {selectedTab === "MANAGE" && (
              <ManageSubscriptions
                selectedSubscription={selectedSubscription}
                setSelectedSubscription={setSelectedSubscription}
                handleOpenEditDiscount={handleOpenEditDiscount}
              />
            )}
          </Box>
        )}
      </DialogContent>
    </StyledDialog>
  );
}
export default SubscriptionPlansDialog;
