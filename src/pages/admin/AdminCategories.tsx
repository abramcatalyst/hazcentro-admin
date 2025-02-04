import CategoriesWrapper from "src/components/pages/Admin/CategoryManagement/CategoriesWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import { ErrorBoundary } from "react-error-boundary";

const AdminCategories = () => {
  return (
    <div>
      <MetaDecorator title=" Category Management" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <CategoriesWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminCategories;
