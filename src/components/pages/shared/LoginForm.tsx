import { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { IToken } from "src/types/auth";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
import { baseUrl, formatErrorMessage } from "src/utils";
import toast from "react-hot-toast";
import StyledOutlinedInput from "src/components/shared/StyledOutlinedInput/StyledOutlinedInput";
import { LuEyeClosed } from "react-icons/lu";
import { RxEyeOpen } from "react-icons/rx";
import LoginFormInfoSection from "src/components/shared/LoginFormInfoSection/LoginFormInfoSection";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.post(`${baseUrl}/auth/login`, values);
        let decodedToken: IToken = await jwtDecode(res.data?.data?.data?.token);
        console.log(decodedToken);
        // dispatch(
        //   setUser({
        //     tokenData: {
        //       firstname: decodedToken?.firstname,
        //       lastname: decodedToken?.lastname,
        //       userId: decodedToken?.userId,
        //       role: decodedToken?.role,
        //       isAgent: decodedToken?.isAgent,
        //       lastLogin: decodedToken?.lastLogin,
        //     },
        //   })
        // );
        // await setCookie(res?.data?.data?.data?.token);
        await navigate(ADMIN_ROUTE_LINKS.ADMIN_OVERVIEW);
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);

        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().label("Email"),
      password: yup.string().min(6).required().label("Password"),
    }),
  });

  const {
    isSubmitting,
    errors,
    values,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;
  return (
    <Box
      sx={{
        mb: 1,
        p: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          maxWidth: "520px",
          background: "#F9F2E1",
          borderRadius: "32px",
          py: 4,
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            mx: "auto",
            maxWidth: "432px",
          }}
        >
          <LoginFormInfoSection text="Login Account" />
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Email Address</InputLabel>
            <StyledOutlinedInput
              label="Email Address"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Password</InputLabel>
            <StyledOutlinedInput
              label="Password"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              endAdornment={
                <IconButton
                  onClick={() => {
                    setShowPassword((curr) => !curr);
                  }}
                >
                  {showPassword ? <RxEyeOpen /> : <LuEyeClosed />}
                </IconButton>
              }
            />
            {touched.email && errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>
          <Box sx={{ mb: 1, mt: 3 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              size="large"
              sx={{ borderRadius: "12px", height: { xs: "50px", sm: "52px" } }}
            >
              {isSubmitting ? "Processing" : "Continue to dashboard"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
