import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DistributorDetailsPageWrapper from "src/components/pages/Admin/DistributorDetailsPage/DistributorDetailsPageWrapper";
import SkilledWorkerDetailsPageWrapper from "src/components/pages/Admin/SkilledWorkerUserDetailsPage/SkilledWorkerDetailsPageWrapper";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
// import SkilledWorkProviderWrapper from "src/components/pages/Admin/SkilledWorkProviderDetailsPage/SkilledWorkProviderWrapper";
import UserDetailsPageWrapper from "src/components/pages/Admin/UserDetailsPage/UserDetailsPageWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";
import { fetchSingleUser } from "src/services/users";
import { formatErrorMessage } from "src/utils";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { UserType } from "src/types/users";

export type UserDetailsPageProps = {
  data: UserType;
};
const AdminUserDetailsPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER, { params, open }],
    queryFn: () => fetchSingleUser(params?.id || ""),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER],
      });
    };
  }, []);

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }
  return (
    <div>
      <MetaDecorator title=" User's Profile" />
      {data?.role === "user" && <UserDetailsPageWrapper data={data} />}
      {data?.role === "vendor" && <DistributorDetailsPageWrapper data={data} />}
      {data?.role === "worker" && (
        <SkilledWorkerDetailsPageWrapper data={data} />
      )}

      {/* <SkilledWorkProviderWrapper /> */}
    </div>
  );
};

export default AdminUserDetailsPage;
