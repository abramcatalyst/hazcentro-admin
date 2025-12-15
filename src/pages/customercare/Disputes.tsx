import { ErrorBoundary } from "react-error-boundary";
import DisputesWrapper from "src/components/pages/CustomerReps/Disputes/DisputesWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const Disputes = () => {
  return (
    <div>
      <MetaDecorator title=" Disputes" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DisputesWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default Disputes;
