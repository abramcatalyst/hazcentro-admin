import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid2";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import {
  bannerLinkTypes,
  bannerPlacementList,
  baseUrl,
  DATE_FORMAT,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import useManageToken from "src/hooks/useManageToken";
import dayjs, { Dayjs } from "dayjs";
import { BannerType } from "src/types/banners";

const sizing = { xs: 12, sm: 6 };
type Props = {
  open: boolean;
  selected: BannerType;
  handleClose: () => void;
};

function UpdateExternalBannerDialog({ open, selected, handleClose }: Props) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const theme = useTheme();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const { logOutUser } = useManageToken();

  const formik = useFormik({
    initialValues: {
      link_target: selected?.link_target || "",
      is_active: 1,
      start_date: selected?.start_date || "",
      end_date: selected?.end_date || "",
      order: selected?.order || "",
      placement: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      if (isAuthTokenExpired()) {
        logOutUser();
      }
      setDefaultHeaders();
      try {
        const formData = new FormData();

        formData.append("link_target", values.link_target);
        formData.append("start_date", values.start_date);
        formData.append("end_date", values.end_date);
        formData.append("is_active", values.is_active.toString());
        formData.append("placement", values.placement);
        formData.append("link_type", bannerLinkTypes.external);

        if (image) {
          formData.append("image", image);
        }
        const res = await axios.post(`${baseUrl}/admin/banners`, formData);
        const successMsg = formatSuccessMessage(res);
        setImagePreview("");
        setImage(null);
        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_EXTERNAL_BANNERS],
        });
        toast.success(successMsg);
        handleClose();
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);
        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      link_target: yup.string().required().label("URL"),
    }),
  });

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
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
            Add Banner
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
          <Grid container spacing={1}>
            <Grid size={{ xs: 12 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Enter URL</InputLabel>

                <OutlinedInput
                  label="Enter URL"
                  name="link_target"
                  value={values.link_target}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.link_target && touched.link_target && (
                  <FormHelperText error>{errors.link_target}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Select banner placement</InputLabel>
                <Select
                  label="Select banner placement"
                  name="placement"
                  value={values.placement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {bannerPlacementList.map((item) => (
                    <MenuItem value={item?.value}>{item?.title}</MenuItem>
                  ))}
                </Select>
                {errors.placement && touched.placement && (
                  <FormHelperText error>{errors.placement}</FormHelperText>
                )}
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
          </Grid>
          <Box
            sx={{
              mt: 1,
              mb: 1,
            }}
          >
            <FormControl variant="outlined" sx={{ display: "none" }}>
              <input
                accept="image/*"
                type="file"
                ref={imageRef}
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </FormControl>
            <Typography gutterBottom variant="body2">
              Image (Optional)
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, py: 1, px: 0.5 }}
            >
              <IconButton
                onClick={() => {
                  if (imageRef) {
                    imageRef?.current?.click();
                  }
                }}
              >
                <AddCircleOutlineRoundedIcon />
              </IconButton>
              {imagePreview && (
                <Box
                  sx={{
                    width: { xs: "70px", sm: "86px" },
                    height: { xs: "40px", sm: "56px" },
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="custom"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <br />
          <Divider />
          <Box
            sx={{ my: 3, display: "flex", gap: 1, justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={isSubmitting}
              sx={{
                height: "50px",
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

export default UpdateExternalBannerDialog;
