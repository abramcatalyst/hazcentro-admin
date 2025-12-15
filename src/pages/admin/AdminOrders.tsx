import { ErrorBoundary } from "react-error-boundary";
import OrderManagementWrapper from "src/components/pages/Admin/OrderManagement/OrderManagementWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminOrders = () => {
  return (
    <div>
      <MetaDecorator title=" Orders Management" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <OrderManagementWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminOrders;
