import { ErrorBoundary } from "react-error-boundary";
import DisputeDetailsWrapper from "src/components/pages/CustomerReps/DisputeDetails/DisputeDetailsWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const CustomerDisputeDetails = () => {
  return (
    <div>
      <MetaDecorator title=" Disputes Details" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DisputeDetailsWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default CustomerDisputeDetails;
