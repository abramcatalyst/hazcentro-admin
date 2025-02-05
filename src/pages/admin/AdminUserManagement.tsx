import { ErrorBoundary } from "react-error-boundary";
import UsersWrapper from "src/components/pages/Admin/Users/UsersWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminUserManagement = () => {
  return (
    <div>
      <MetaDecorator title=" User Management" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <UsersWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminUserManagement;
