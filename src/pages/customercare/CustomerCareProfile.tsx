import AgentProfileWrapper from "src/components/pages/CustomerReps/AgentProfile/AgentProfileWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const CustomerCareProfile = () => {
  return (
    <div>
      <MetaDecorator title=" My Profile" />

      <AgentProfileWrapper />
    </div>
  );
};

export default CustomerCareProfile;
