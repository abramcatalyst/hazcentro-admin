import { useMemo, useState } from "react";
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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { useTheme } from "@mui/material/styles";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";

import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import CreateItemNotification from "src/components/shared/CreateItemNotification/CreateItemNotification";
import { SettingsType } from "src/types/settings";
import dayjs, { Dayjs } from "dayjs";
import { fetchCategories } from "src/services/categories";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";

type Props = {
  open: boolean;
  data: SettingsType | null;
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

function DiscountSettingDialog({ open, data, handleClose }: Props) {
  const [submitting, setIsSubmitting] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const queryClient = useQueryClient();

  const {
    isError,
    error,
    isLoading,
    data: categoryData,
  } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS, {}],
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
    end_date: "2025-08-31",
    applicable_categories: [],
    is_active: true,
    override_vendor_discount: false,
    description: "",
  };
  const emailList = useMemo(() => {
    let items: string[] = [];
    if (data && data?.admin_email_for_alerts) {
      items = safeJSONParse(data?.admin_email_for_alerts?.value) || [];
    }
    return items;
  }, [data]);
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();

      try {
        helpers.setSubmitting(true);
        const res = await axios.put(
          `${baseUrl}/admin/category-discounts`,
          values
        );

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
    setFieldValue,
  } = formik;

  const handleRemoveEmail = async (val: string) => {
    setDefaultHeaders();
    const emailValues = emailList?.filter((item) => item !== val) || [];
    let payload = {
      key: "admin_email_for_alerts",
      value: emailValues,
    };
    try {
      setIsSubmitting(true);
      const res = await axios.put(
        `${baseUrl}/admin/category-discounts/9f8bcc21-d21d-479d-9b2d-49158f17ee85`,
        payload
      );

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
  const DATE_FORMAT = "YYYY-MM-DD";
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
        {isError ? (
          <HalfScreenError text={formatErrorMessage(error)} />
        ) : isLoading ? (
          <HalfScreenLoader />
        ) : (
          <Box>
            <Box>
              <CreateItemNotification text="Note: All mail message will be sent to the official Hazcentro email “hazcetro@mail.com. You can change this setting below" />
            </Box>
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
                    <FormControl size="small" fullWidth>
                      <InputLabel>Categories</InputLabel>
                      <Select
                        multiple
                        value={selectedCategories}
                        onChange={handleChangeCategory}
                        input={
                          <OutlinedInput label="Categories" size="small" />
                        }
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {categoryData?.data.map((item) => (
                          <MenuItem key={item?.name} value={item?.name}>
                            <Checkbox
                              size="small"
                              checked={selectedCategories.includes(item?.name)}
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
                        <Typography sx={{ fontSize: "14px" }}>
                          {item}
                        </Typography>
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
                  disabled={isSubmitting || submitting}
                >
                  {isSubmitting ? "Processing" : "Submit"}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </StyledDialog>
  );
}
export default DiscountSettingDialog;
