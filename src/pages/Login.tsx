import Box from "@mui/material/Box";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import LoginLayout from "src/components/layouts/LoginLayout/LoginLayout";
import LoginForm from "src/components/pages/shared/LoginForm";
const Login = () => {
  return (
    <Box>
      <MetaDecorator title=" Login" />
      <LoginLayout title="Login to your account">
        <LoginForm />
      </LoginLayout>
    </Box>
  );
};

export default Login;
