import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import SettingsWrapper from "src/components/pages/Admin/Settings/SettingsWrapper";

const AdminSettings = () => {
  return (
    <div>
      <MetaDecorator title=" Settings" />
      <SettingsWrapper />
    </div>
  );
};

export default AdminSettings;
