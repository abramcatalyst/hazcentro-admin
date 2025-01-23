import CategoriesWrapper from "src/components/pages/Admin/CategoryManagement/CategoriesWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminCategories = () => {
  return (
    <div>
      <MetaDecorator title=" Category Management" />
      <CategoriesWrapper />
    </div>
  );
};

export default AdminCategories;
