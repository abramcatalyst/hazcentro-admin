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
import { currencyFormater } from "src/utils";
import EditCategoryDialog from "./EditCategoryDialog";
import { FaEdit } from "react-icons/fa";
import { CategoryType } from "src/types/categories";
import Logo from "src/assets/images/logo.png";

type CategoryCardProps = {
  data: CategoryType;
  handleOpenDeleteDialog: (value: CategoryType) => void;
  handleOpenEditCategoryDialog: (value: CategoryType) => void;
};

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const CategoryCard = ({
  data,
  handleOpenEditCategoryDialog,
}: CategoryCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`${ADMIN_ROUTE_LINKS.ADMIN_SINGLE_CATEGORY}/1234`);
  };
  return (
    <Box
      sx={{
        // background:  "#FBE6C433" : "#F7F7FB",
        background: "#F7F7FB",
        borderRadius: "12px",
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
            src={data?.icon || Logo}
            alt={data?.name}
            style={{
              width: "46px",
              height: "46px",
              cursor: "pointer",
              borderRadius: "50%",
            }}
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
            {currencyFormater(data?.total_products)}
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
            <Typography sx={{ fontSize: "13px" }}>{data?.name}</Typography>
            <IconButton
              size="small"
              sx={{ color: theme.palette.info.main }}
              onClick={() => {
                handleOpenEditCategoryDialog(data);
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

type Props = {
  data: CategoryType[];
};
const CategoriesTable = ({ data }: Props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const handleOpenDeleteDialog = (value: CategoryType) => {
    setOpenDeleteDialog(true);
    setSelectedCategory(value);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const handleOpenEditCategoryDialog = (value: CategoryType) => {
    setOpenEditCategoryDialog(true);
    setSelectedCategory(value);
  };
  const handleCloseEditCategoryDialog = () => {
    setOpenEditCategoryDialog(false);
    setSelectedCategory(null);
  };
  return (
    <Box sx={{ background: "#ffffff", my: 1.5, p: 1 }}>
      {openDeleteDialog && selectedCategory && (
        <DeleteAgentDialog
          open={openDeleteDialog}
          selectedCategory={selectedCategory}
          handleClose={handleCloseDeleteDialog}
        />
      )}
      {openEditCategoryDialog && selectedCategory && (
        <EditCategoryDialog
          open={openEditCategoryDialog}
          selectedCategory={selectedCategory}
          handleClose={handleCloseEditCategoryDialog}
        />
      )}

      <Grid container spacing={1}>
        {data.map((row) => (
          <Grid size={sizing}>
            <CategoryCard
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
