import { ErrorBoundary } from "react-error-boundary";
import DistributorsWrapper from "src/components/pages/CustomerReps/Distributors/DistributorsWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const Distributors = () => {
  return (
    <div>
      <MetaDecorator title=" Distributors" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DistributorsWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default Distributors;
