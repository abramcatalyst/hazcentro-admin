import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import CreateItemNotification from "src/components/shared/CreateItemNotification/CreateItemNotification";

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
import { CategoryType } from "src/types/categories";
import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import useManageToken from "src/hooks/useManageToken";

type Props = {
  open: boolean;
  selectedCategory: CategoryType;
  handleClose: () => void;
};

function EditCategoryDialog({ open, selectedCategory, handleClose }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const theme = useTheme();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const { logOutUser } = useManageToken();
  const formik = useFormik({
    initialValues: {
      name: selectedCategory?.name || "",
      description: selectedCategory?.description || "",
      is_featured: selectedCategory?.is_featured || "0",
    },
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      if (isAuthTokenExpired()) {
        logOutUser();
      }
      setDefaultHeaders();
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("is_featured", values.is_featured.toString());

        if (image) {
          formData.append("icon", image);
        }
        const res = await axios.post(
          `${baseUrl}/admin/categories/${selectedCategory.id}`,
          formData
        );
        const successMsg = formatSuccessMessage(res);
        setImagePreview("");
        setImage(null);
        toast.success(successMsg);
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_CATEGORIES],
        });
        handleClose();
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);

        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      name: yup.string().required().label("Name"),
      description: yup.string().min(6).required().label("Description"),
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
            Edit Category
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
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Enter a name for the catalog</InputLabel>
              <OutlinedInput
                label="Enter a name for the catalog"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Enter a description</InputLabel>
              <OutlinedInput
                multiline
                rows={2}
                label="Enter a description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.description && touched.description && (
                <FormHelperText error>{errors.description}</FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Is Featured</FormLabel>
              <RadioGroup
                row
                name="is_featured"
                value={values.is_featured}
                onChange={handleChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="No" />
                <FormControlLabel value="1" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Box>
          <CreateItemNotification />
          <Box
            sx={{
              mt: 1,
              mb: 2,
              background: "#F7F7F980",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              p: 1,
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
              Customizations
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
                    width: { xs: "40px", sm: "46px" },
                    height: { xs: "40px", sm: "46px" },
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: `1.5px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="custom"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
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
                height: "55px",
                minWidth: { xs: "150px", sm: "184px" },
              }}
            >
              {isSubmitting ? "Processing" : "Save Changes"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default EditCategoryDialog;
