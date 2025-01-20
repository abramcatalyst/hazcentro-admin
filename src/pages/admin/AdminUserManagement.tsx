import UsersWrapper from "src/components/pages/Admin/Users/UsersWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminUserManagement = () => {
  return (
    <div>
      <MetaDecorator title=" User Management" />
      <UsersWrapper />
    </div>
  );
};

export default AdminUserManagement;
