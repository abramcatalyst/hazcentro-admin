// import DashboardWrapper from "src/components/pages/Admin/Dashboard/DashboardWrapper";
import OverviewWrapper from "src/components/pages/CustomerReps/Overview/OverviewWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const CustomerOverview = () => {
  return (
    <div>
      <MetaDecorator title=" Overview" />

      <OverviewWrapper />
    </div>
  );
};

export default CustomerOverview;
