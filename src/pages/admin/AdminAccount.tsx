import AccountWrapper from "src/components/pages/Admin/Account/AccountWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAccount = () => {
  return (
    <div>
      <MetaDecorator title=" Account" />
      <AccountWrapper />
    </div>
  );
};

export default AdminAccount;
