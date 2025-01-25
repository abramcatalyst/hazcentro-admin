import SingleCategoryWrapper from "src/components/pages/Admin/SingleCategoryPage/SingleCategoryWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminSingleCategoryPage = () => {
  return (
    <div>
      <MetaDecorator title=" Category Details" />
      <SingleCategoryWrapper />
    </div>
  );
};

export default AdminSingleCategoryPage;
