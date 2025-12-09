import { ErrorBoundary } from "react-error-boundary";
import HelpAndSupportWrapper from "src/components/pages/Admin/HelpAndSupport/HelpAndSupportWrapper";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminHelpAndSupport = () => {
  return (
    <div>
      <MetaDecorator title=" Help and Support" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <HelpAndSupportWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminHelpAndSupport;
