import { ErrorBoundary } from "react-error-boundary";
import AccountWrapper from "src/components/pages/Admin/Account/AccountWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAccount = () => {
  return (
    <div>
      <MetaDecorator title=" Account" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <AccountWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminAccount;
