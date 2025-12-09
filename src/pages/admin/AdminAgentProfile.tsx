import { ErrorBoundary } from "react-error-boundary";
import AgentProfileWrapper from "src/components/pages/Admin/AgentProfile/AgentProfileWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAgentProfile = () => {
  return (
    <div>
      <MetaDecorator title=" Agent Profile" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AgentProfileWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminAgentProfile;
