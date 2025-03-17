import EscrowWrapper from "src/components/pages/Admin/Escrow/EscrowWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminEscrowDashboard = () => {
  return (
    <div>
      <MetaDecorator title=" Escrow Dashboard" />
      <EscrowWrapper />
    </div>
  );
};

export default AdminEscrowDashboard;
