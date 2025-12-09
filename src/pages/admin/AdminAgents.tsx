import { ErrorBoundary } from "react-error-boundary";
import AgentsWrapper from "src/components/pages/Admin/Agents/AgentsWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAgents = () => {
  return (
    <div>
      <MetaDecorator title=" Agents" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AgentsWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminAgents;
