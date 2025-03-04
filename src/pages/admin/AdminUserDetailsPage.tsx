// import SkilledWorkerDetailsPageWrapper from "src/components/pages/Admin/SkilledWorkerUserDetailsPage/SkilledWorkerDetailsPageWrapper";
import SkilledWorkProviderWrapper from "src/components/pages/Admin/SkilledWorkProviderDetailsPage/SkilledWorkProviderWrapper";
// import UserDetailsPageWrapper from "src/components/pages/Admin/UserDetailsPage/UserDetailsPageWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminUserDetailsPage = () => {
  return (
    <div>
      <MetaDecorator title=" User's Profile" />
      {/* <UserDetailsPageWrapper /> */}
      {/* <SkilledWorkerDetailsPageWrapper /> */}
      <SkilledWorkProviderWrapper />
    </div>
  );
};

export default AdminUserDetailsPage;
