import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import MaleAvatar from "src/assets/images/avatar-male.png";
import FemaleAvatar from "src/assets/images/avatar-female.png";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import DeleteAgentDialog from "./DeleteAgentDialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
} from "src/utils";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQuery } from "@tanstack/react-query";
import { fetchAgents } from "src/services/agents";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { AgentType } from "src/types/agents";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import EditAgentDialog from "./EditAgentDialog";

type AgentCardProps = {
  data: AgentType;
  handleOpenDeleteDialog: (info: AgentType) => void;
  handleOpenEditDialog: (info: AgentType) => void;
};

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const AgentCard = ({
  data,
  handleOpenDeleteDialog,
  handleOpenEditDialog,
}: AgentCardProps) => {
  const navigate = useNavigate();
  const { name, gender, state } = data;

  const handleViewProfile = () => {
    navigate(`${ADMIN_ROUTE_LINKS.ADMIN_AGENT_PROFILE}/1234`);
  };
  return (
    <Box
      sx={{
        p: 1,
        background: gender === "male" ? "#FBE6C433" : "#F7F7FB",
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: "12px",
      }}
    >
      <Box>
        <img
          src={gender === "male" ? MaleAvatar : FemaleAvatar}
          alt={name}
          style={{ width: "46px", height: "46px", cursor: "pointer" }}
          onClick={() => {
            handleViewProfile();
          }}
        />
      </Box>
      <Box>
        <Typography
          noWrap
          sx={{ fontWeight: 600, mb: 0.4, cursor: "pointer" }}
          onClick={() => {
            handleViewProfile();
          }}
        >
          {name}
        </Typography>
        <Box sx={{ display: "none" }}>
          <Chip size="small" label={state} />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            my: 0.4,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", gap: 0.5, my: 0.4, alignItems: "center" }}
          >
            {renderStatus(data?.status)}
          </Box>

          <Box sx={{ display: "flex", gap: 0.8 }}>
            <IconButton
              color="error"
              size="small"
              onClick={() => {
                handleOpenDeleteDialog(data);
              }}
            >
              <RiDeleteBin6Line style={{ fontSize: "15px" }} />
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                handleOpenEditDialog(data);
              }}
            >
              <FaRegEdit style={{ fontSize: "15px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const AgentsTable = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "0",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 0;
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_AGENTS, { limit, page }],
    queryFn: () => fetchAgents({ limit: limit, page }),
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams(
      (params) => {
        params.set(sPage, `${newPage + 1}`);
        return params;
      },
      { replace: true }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "0");
        return params;
      },
      { replace: true }
    );
  };

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }
  const handleOpenDeleteDialog = (info: AgentType) => {
    setSelectedAgent(info);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setSelectedAgent(null);
    setOpenDeleteDialog(false);
  };
  const handleOpenEditDialog = (info: AgentType) => {
    setSelectedAgent(info);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setSelectedAgent(null);
    setOpenEditDialog(false);
  };

  return (
    <Box>
      <Box sx={{ background: "#ffffff", my: 1.5, p: 1, minHeight: "40vh" }}>
        {openDeleteDialog && selectedAgent && (
          <DeleteAgentDialog
            selectedAgent={selectedAgent}
            open={openDeleteDialog}
            handleClose={handleCloseDeleteDialog}
          />
        )}
        {openEditDialog && selectedAgent && (
          <EditAgentDialog
            open={openEditDialog}
            selectedAgent={selectedAgent}
            handleClose={handleCloseEditDialog}
          />
        )}
        {data?.total <= 0 && <EmptyTable subText="No agent found" />}
        <Grid container spacing={1}>
          {data?.total > 0 &&
            data?.data?.map((row) => (
              <Grid size={sizing}>
                <AgentCard
                  data={row}
                  handleOpenDeleteDialog={handleOpenDeleteDialog}
                  handleOpenEditDialog={handleOpenEditDialog}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <TablePagination
        component="div"
        count={data?.total || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AgentsTable;
