import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import DeleteAgentDialog from "./DeleteAgentDialog";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
import Cat1 from "src/assets/tempimages/cat1.png";
import Cat2 from "src/assets/tempimages/cat2.png";
import Cat3 from "src/assets/tempimages/cat3.png";
import { currencyFormater } from "src/utils";
import EditCategoryDialog from "./EditCategoryDialog";
import { FaEdit } from "react-icons/fa";

type CategoryType = {
  name: string;
  image: string;
  state: string;
};
type AgentCardProps = {
  data: CategoryType;
  handleOpenDeleteDialog: () => void;
  handleOpenEditCategoryDialog: () => void;
};

const tempAgents: CategoryType[] = [
  { name: "Electronics", image: Cat1, state: "4532" },
  { name: "Fashions", image: Cat2, state: "32" },
  { name: "Cosmetics", image: Cat3, state: "42" },
];

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const AgentCard = ({ data, handleOpenEditCategoryDialog }: AgentCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, image, state } = data;

  const handleViewProfile = () => {
    navigate(`${ADMIN_ROUTE_LINKS.ADMIN_SINGLE_CATEGORY}/1234`);
  };
  return (
    <Box
      sx={{
        background: image === "male" ? "#FBE6C433" : "#F7F7FB",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton>
          <MoreVertRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          pb: 1,
          px: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: "12px",
        }}
      >
        <Box>
          <img
            src={image}
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
            sx={{
              fontWeight: 600,
              mb: 0.4,
              cursor: "pointer",
              fontSize: { xs: "16px", sm: "20px" },
            }}
            onClick={() => {
              handleViewProfile();
            }}
          >
            {currencyFormater(state)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              my: 0.4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>{name}</Typography>
            <IconButton
              size="small"
              sx={{ color: theme.palette.info.main }}
              onClick={() => {
                handleOpenEditCategoryDialog();
              }}
            >
              <FaEdit />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const CategoriesTable = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenEditCategoryDialog = () => {
    setOpenEditCategoryDialog(true);
  };
  const handleCloseEditCategoryDialog = () => {
    setOpenEditCategoryDialog(false);
  };
  return (
    <Box sx={{ background: "#ffffff", my: 1.5, p: 1 }}>
      {openDeleteDialog && (
        <DeleteAgentDialog
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
        />
      )}
      {openEditCategoryDialog && (
        <EditCategoryDialog
          open={openEditCategoryDialog}
          handleClose={handleCloseEditCategoryDialog}
        />
      )}

      <Grid container spacing={1}>
        {tempAgents.map((row) => (
          <Grid size={sizing}>
            <AgentCard
              data={row}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
              handleOpenEditCategoryDialog={handleOpenEditCategoryDialog}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoriesTable;
