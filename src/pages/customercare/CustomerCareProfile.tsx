import { ErrorBoundary } from "react-error-boundary";
import AgentProfileWrapper from "src/components/pages/CustomerReps/AgentProfile/AgentProfileWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const CustomerCareProfile = () => {
  return (
    <div>
      <MetaDecorator title=" My Profile" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AgentProfileWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default CustomerCareProfile;
