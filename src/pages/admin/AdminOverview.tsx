import DashboardWrapper from "src/components/pages/Admin/Dashboard/DashboardWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminOverview = () => {
  return (
    <div>
      <MetaDecorator title=" Overview" />

      <DashboardWrapper />
    </div>
  );
};

export default AdminOverview;
