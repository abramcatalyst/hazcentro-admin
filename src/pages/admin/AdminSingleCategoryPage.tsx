import { ErrorBoundary } from "react-error-boundary";
import SingleCategoryWrapper from "src/components/pages/Admin/SingleCategoryPage/SingleCategoryWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminSingleCategoryPage = () => {
  return (
    <div>
      <MetaDecorator title=" Category Details" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <SingleCategoryWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminSingleCategoryPage;
