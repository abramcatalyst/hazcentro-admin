import { ErrorBoundary } from "react-error-boundary";
import AdsCategoryWrapper from "src/components/pages/Admin/AdsCategory/AdsCategoryWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAdsCategory = () => {
  return (
    <div>
      <MetaDecorator title=" Ads Category" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AdsCategoryWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminAdsCategory;
