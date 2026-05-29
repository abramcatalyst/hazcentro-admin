import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";

const audienceOptions = [
  { title: "All", value: "all" },
  { title: "Users only", value: "users_only" },
];
function BroadcastMessageForm() {
  let initialValues = {
    title: "",
    body: "",
    audience: "all", //users_only
    data: {
      // "type": "promo",
      // "campaign_id": "spring-2026"
    },
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();

      try {
        helpers.setSubmitting(true);
        const res = await axios.post(`${baseUrl}/admin/push/broadcast`, values);

        toast.success(formatSuccessMessage(res?.data));
        helpers.resetForm();
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);

        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().label("Title"),
      body: yup.string().required().label("Message"),
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
    <Container maxWidth="md">
      <Box component={"form"} onSubmit={handleSubmit}>
        <Box>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Enter message title</InputLabel>
            <OutlinedInput
              label="Enter message title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title && (
              <FormHelperText error>{errors.title}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Enter your message</InputLabel>
            <OutlinedInput
              label="Enter your message"
              multiline
              rows={6}
              name="body"
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.body && errors.body && (
              <FormHelperText error>{errors.body}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Target audience</FormLabel>
            <RadioGroup
              row
              name="audience"
              value={values.audience}
              onChange={handleChange}
            >
              {audienceOptions.map((item) => (
                <FormControlLabel
                  value={item.value}
                  control={<Radio />}
                  label={item.title}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          sx={{ my: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{
              height: "55px",
              minWidth: { xs: "150px", sm: "184px" },
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing" : "Publish"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default BroadcastMessageForm;
