import { ErrorBoundary } from "react-error-boundary";
import OrderDetailsWrapper from "src/components/pages/shared/OrderDetailsPage/OrderDetailsWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

const CustomerCareOrderDetailsPage = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <OrderDetailsWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default CustomerCareOrderDetailsPage;
