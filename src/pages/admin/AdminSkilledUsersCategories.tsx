import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import { ErrorBoundary } from "react-error-boundary";
import SkilledUsersCategoryWrapper from "src/components/pages/Admin/SkilledUsersCategory/SkilledUsersCategoryWrapper";

const AdminSkilledUsersCategories = () => {
  return (
    <div>
      <MetaDecorator title=" Skills Category" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <SkilledUsersCategoryWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminSkilledUsersCategories;
