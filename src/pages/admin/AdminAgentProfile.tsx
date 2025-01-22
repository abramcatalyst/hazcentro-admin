import AgentProfileWrapper from "src/components/pages/Admin/AgentProfile/AgentProfileWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAgentProfile = () => {
  return (
    <div>
      <MetaDecorator title=" Agent Profile" />
      <AgentProfileWrapper />
    </div>
  );
};

export default AdminAgentProfile;
