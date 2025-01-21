import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import MaleAvatar from "src/assets/images/avatar-male.png";
import FemaleAvatar from "src/assets/images/avatar-female.png";
import { useTheme } from "@mui/material/styles";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

type AgentCardProps = {
  name: string;
  gender: "male" | "female";
  state: string;
};

const tempAgents: AgentCardProps[] = [
  { name: "Pi Colines", gender: "male", state: "Lagos" },
  { name: "John Colines", gender: "male", state: "Lagos" },
  { name: "Tasha Philip", gender: "female", state: "Abuja" },
  { name: "Sarah Colines", gender: "female", state: "Lagos" },
  { name: "Sam Doe", gender: "male", state: "Lagos" },
];

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const AgentCard = ({ name, gender, state }: AgentCardProps) => {
  const theme = useTheme();
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
          style={{ width: "46px", height: "46px" }}
        />
      </Box>
      <Box>
        <Typography noWrap sx={{ fontWeight: 600, mb: 0.4 }}>
          {name}
        </Typography>
        <Box>
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
            <Box
              sx={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: theme.palette.success.light,
              }}
            />
            <Typography sx={{ fontSize: "11px" }}>Active</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 0.8 }}>
            <IconButton color="error" size="small">
              <RiDeleteBin6Line style={{ fontSize: "15px" }} />
            </IconButton>
            <IconButton size="small" color="inherit">
              <FaRegEdit style={{ fontSize: "15px" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const AgentsTable = () => {
  return (
    <Box sx={{ background: "#ffffff", my: 1.5, p: 1 }}>
      <Grid container spacing={1}>
        {tempAgents.map((row) => (
          <Grid size={sizing}>
            <AgentCard state={row.state} name={row.name} gender={row.gender} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AgentsTable;
