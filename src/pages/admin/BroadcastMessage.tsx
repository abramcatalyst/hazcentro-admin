import { ErrorBoundary } from "react-error-boundary";
import Box from "@mui/material/Box";
import BroadcastMessageForm from "src/components/pages/Admin/BroadcastMessage/BroadcastMessage";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const BroadcastMessage = () => {
  return (
    <div>
      <MetaDecorator title=" Broadcast Message" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <AppHeader text=" Broadcast Message" />
      </Box>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <BroadcastMessageForm />
      </ErrorBoundary>
    </div>
  );
};

export default BroadcastMessage;
