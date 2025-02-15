import UserDetailsPageWrapper from "src/components/pages/Admin/UserDetailsPage/UserDetailsPageWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminUserDetailsPage = () => {
  return (
    <div>
      <MetaDecorator title=" User's Profile" />
      <UserDetailsPageWrapper />
    </div>
  );
};

export default AdminUserDetailsPage;
