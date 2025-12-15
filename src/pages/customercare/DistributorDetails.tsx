import { ErrorBoundary } from "react-error-boundary";
import DistributorDetailsWrapper from "src/components/pages/CustomerReps/DistributorDetails/DistributorDetailsWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const DistributorDetails = () => {
  return (
    <div>
      <MetaDecorator title=" Distributor Details" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <DistributorDetailsWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default DistributorDetails;
