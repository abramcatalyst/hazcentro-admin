// import DashboardWrapper from "src/components/pages/Admin/Dashboard/DashboardWrapper";
import { ErrorBoundary } from "react-error-boundary";
import CustomerCareOrdersWrapper from "src/components/pages/CustomerReps/Orders/CustomerCareOrdersWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const CustomerCareOrders = () => {
  return (
    <div>
      <MetaDecorator title=" Orders" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <CustomerCareOrdersWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default CustomerCareOrders;
