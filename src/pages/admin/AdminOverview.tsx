import { ErrorBoundary } from "react-error-boundary";
import DashboardWrapper from "src/components/pages/Admin/Dashboard/DashboardWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminOverview = () => {
  return (
    <div>
      <MetaDecorator title=" Overview" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DashboardWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminOverview;
