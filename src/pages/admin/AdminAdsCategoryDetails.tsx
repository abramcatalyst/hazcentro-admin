import { ErrorBoundary } from "react-error-boundary";
import AdsCategoryDetailsWrapper from "src/components/pages/Admin/AdsCategoryDetailsProducts/AdsCategoryDetailsProductsWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAdsCategoryDetails = () => {
  return (
    <div>
      <MetaDecorator title=" Ads Category Details" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AdsCategoryDetailsWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminAdsCategoryDetails;
