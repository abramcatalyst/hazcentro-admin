import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import SettingsWrapper from "src/components/pages/Admin/Settings/SettingsWrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

const AdminSettings = () => {
  return (
    <div>
      <MetaDecorator title=" Settings" />
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <SettingsWrapper />
      </ErrorBoundary>
    </div>
  );
};

export default AdminSettings;
