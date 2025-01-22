import OrderManagementWrapper from "src/components/pages/Admin/OrderManagement/OrderManagementWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminOrders = () => {
  return (
    <div>
      <MetaDecorator title=" Orders Management" />
      <OrderManagementWrapper />
    </div>
  );
};

export default AdminOrders;
