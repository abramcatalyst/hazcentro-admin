import AgentsWrapper from "src/components/pages/Admin/Agents/AgentsWrapper";
import MetaDecorator from "src/components/shared/MetaDecorator/MetaDecorator";

const AdminAgents = () => {
  return (
    <div>
      <MetaDecorator title=" Agents" />
      <AgentsWrapper />
    </div>
  );
};

export default AdminAgents;
