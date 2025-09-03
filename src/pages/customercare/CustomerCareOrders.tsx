// import DashboardWrapper from "src/components/pages/Admin/Dashboard/DashboardWrapper";
import CustomerCareOrdersWrapper from "src/components/pages/CustomerReps/Orders/CustomerCareOrdersWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const CustomerCareOrders = () => {
  return (
    <div>
      <MetaDecorator title=" Orders" />

      <CustomerCareOrdersWrapper />
    </div>
  );
};

export default CustomerCareOrders;
