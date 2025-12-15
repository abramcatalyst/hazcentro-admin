// import DashboardWrapper from "src/components/pages/Admin/Dashboard/DashboardWrapper";
import { ErrorBoundary } from "react-error-boundary";
import OverviewWrapper from "src/components/pages/CustomerReps/Overview/OverviewWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const CustomerOverview = () => {
  return (
    <div>
      <MetaDecorator title=" Overview" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <OverviewWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default CustomerOverview;
