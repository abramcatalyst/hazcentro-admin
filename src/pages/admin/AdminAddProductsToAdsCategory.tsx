import { ErrorBoundary } from "react-error-boundary";
import AddProductsToAdsCategoryWrapper from "src/components/pages/Admin/AddProductsToAdsCategory/AddProductsToAdsCategoryWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAddProductsToAdsCategory = () => {
  return (
    <div>
      <MetaDecorator title=" Add Products to Ads Category" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AddProductsToAdsCategoryWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminAddProductsToAdsCategory;
