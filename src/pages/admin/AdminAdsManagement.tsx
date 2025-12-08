import { ErrorBoundary } from "react-error-boundary";
import AdsMangementWrapper from "src/components/pages/AdsMangement/AdsMangementWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAdsManagement = () => {
  return (
    <div>
      <MetaDecorator title=" Ads Management" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AdsMangementWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminAdsManagement;
