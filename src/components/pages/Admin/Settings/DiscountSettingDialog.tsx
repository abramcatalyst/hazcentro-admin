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
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material/styles";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import {
  baseUrl,
  convertStringToBoolean,
  formatErrorMessage,
  formatSuccessMessage,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { fetchCategories } from "src/services/categories";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import CustomTab from "src/components/shared/CustomTab/CustomTab";
import ManageDiscounts from "./ManageDiscounts";
import { SettingsDiscountType } from "src/types/settings";
import EditDiscountSetting from "./EditDiscountSetting";

type Props = {
  open: boolean;
  handleClose: () => void;
};
const sizing = { xs: 12, sm: 6 };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tabOptions = [
  { title: "Add Discount", value: "ADD" },
  { title: "Manage Discount", value: "MANAGE" },
];
function DiscountSettingDialog({ open, handleClose }: Props) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const [selectedDiscount, setSelectedDiscount] =
    useState<SettingsDiscountType | null>(null);

  const handleClick = (value: string) => {
    setSelectedTab(value);
  };

  const handleOpenEditDiscount = (value: SettingsDiscountType) => {
    setSelectedDiscount(value);
    setShowEditDiscount(true);
  };

  const handleCloseEditDiscount = () => {
    setSelectedDiscount(null);
    setShowEditDiscount(false);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();

  const {
    isError,
    error,
    isLoading,
    data: categoryData,
  } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_CATEGORIES, {}],
    queryFn: () => fetchCategories({ limit: 1000, page: 1 }),
  });

  const handleChangeCategory = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  let initialValues = {
    name: "",
    rate: 1,
    start_date: "",
    end_date: "",
    applicable_categories: [],
    is_active: "true",
    override_vendor_discount: "false",
    description: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();
      let categories = [];

      // categoryData?.data.map((item) => {
      //   if(item?.name === )
      // })
      if (categoryData) {
        for (let index = 0; index < categoryData?.data?.length; index++) {
          const element = categoryData?.data[index];
          if (element.name === selectedCategories[index]) {
            categories.push(element?.id);
          }
        }
      }
      const payload = {
        ...values,
        is_active: convertStringToBoolean(values.is_active),
        override_vendor_discount: convertStringToBoolean(
          values.override_vendor_discount
        ),
        applicable_categories: categories,
      };
      try {
        helpers.setSubmitting(true);
        const res = await axios.post(
          `${baseUrl}/admin/category-discounts`,
          payload
        );

        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS_DISCOUNTS],
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
      rate: yup.number().positive().required().label("Rate"),
      start_date: yup.string().required().label("Start date"),
      end_date: yup.string().required().label("End date"),
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
    setFieldValue,
  } = formik;

  const DATE_FORMAT = "YYYY-MM-DD";
  console.log("selectedCategories", selectedCategories);
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
            Discount
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
        {showEditDiscount && selectedDiscount ? (
          <EditDiscountSetting
            selectedDiscount={selectedDiscount}
            handleClose={handleCloseEditDiscount}
          />
        ) : (
          <Box>
            {selectedTab === "ADD" && (
              <Box>
                {isError ? (
                  <HalfScreenError text={formatErrorMessage(error)} />
                ) : isLoading ? (
                  <HalfScreenLoader />
                ) : (
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
                                <FormHelperText error>
                                  {errors.name}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid size={{ xs: 12 }}>
                            <FormControl size="small" fullWidth sx={{ my: 1 }}>
                              <InputLabel>Discount Rate(%)</InputLabel>
                              <OutlinedInput
                                label="Discount Rate(%)"
                                name="rate"
                                value={values.rate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              {touched.rate && errors.rate && (
                                <FormHelperText error>
                                  {errors.rate}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid size={{ xs: 12 }}>
                            <FormControl size="small" fullWidth>
                              <InputLabel>Categories</InputLabel>
                              <Select
                                multiple
                                value={selectedCategories}
                                onChange={handleChangeCategory}
                                input={
                                  <OutlinedInput
                                    label="Categories"
                                    size="small"
                                  />
                                }
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                              >
                                {categoryData &&
                                  categoryData?.data.map((item) => (
                                    <MenuItem
                                      key={item?.name}
                                      value={item?.name}
                                    >
                                      <Checkbox
                                        size="small"
                                        checked={selectedCategories.includes(
                                          item?.name
                                        )}
                                      />
                                      <ListItemText primary={item?.name} />
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid size={sizing}>
                            <FormControl fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Start date"
                                  value={startDate}
                                  slotProps={{ textField: { size: "small" } }}
                                  onChange={(value) => {
                                    setStartDate(value);
                                    if (value) {
                                      setFieldValue(
                                        "start_date",
                                        dayjs(value).format(DATE_FORMAT)
                                      );
                                    }
                                  }}
                                />
                              </LocalizationProvider>
                            </FormControl>
                          </Grid>
                          <Grid size={sizing}>
                            <FormControl fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="End date"
                                  value={endDate}
                                  slotProps={{ textField: { size: "small" } }}
                                  onChange={(value) => {
                                    setEndDate(value);
                                    if (value) {
                                      setFieldValue(
                                        "end_date",
                                        dayjs(value).format(DATE_FORMAT)
                                      );
                                    }
                                  }}
                                />
                              </LocalizationProvider>
                            </FormControl>
                          </Grid>
                          <Grid size={sizing}>
                            <FormControl size="small" fullWidth>
                              <FormLabel>Status</FormLabel>
                              <RadioGroup
                                row
                                name="is_active"
                                value={values.is_active}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <FormControlLabel
                                  value="true"
                                  control={<Radio size="small" />}
                                  label="Active"
                                />
                                <FormControlLabel
                                  value="false"
                                  control={<Radio size="small" />}
                                  label="Not Active"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                          <Grid size={sizing}>
                            <FormControl size="small" fullWidth>
                              <FormLabel>Overide vendor discount</FormLabel>
                              <RadioGroup
                                row
                                name="override_vendor_discount"
                                value={values.override_vendor_discount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <FormControlLabel
                                  value="true"
                                  control={<Radio size="small" />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="false"
                                  control={<Radio size="small" />}
                                  label="No"
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
              </Box>
            )}
            {selectedTab === "MANAGE" && (
              <ManageDiscounts
                selectedDiscount={selectedDiscount}
                setSelectedDiscount={setSelectedDiscount}
                handleOpenEditDiscount={handleOpenEditDiscount}
              />
            )}
          </Box>
        )}
      </DialogContent>
    </StyledDialog>
  );
}
export default DiscountSettingDialog;
