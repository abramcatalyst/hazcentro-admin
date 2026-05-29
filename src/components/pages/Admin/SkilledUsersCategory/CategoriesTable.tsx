import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
import {
  baseUrl,
  currencyFormater,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import EditCategoryDialog from "./EditCategoryDialog";
import { FaEdit } from "react-icons/fa";
import { SkillsCategoryType } from "src/types/categories";
import Logo from "src/assets/images/logo.png";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";

type CategoryCardProps = {
  data: SkillsCategoryType;
  handleOpenDeleteDialog: (value: SkillsCategoryType) => void;
  handleOpenEditCategoryDialog: (value: SkillsCategoryType) => void;
};

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const CategoryCard = ({
  data,
  handleOpenEditCategoryDialog,
  handleOpenDeleteDialog,
}: CategoryCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`${ADMIN_ROUTE_LINKS.ADMIN_SINGLE_CATEGORY}/${data?.id}`);
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
        <IconButton
          color="error"
          onClick={() => {
            handleOpenDeleteDialog(data);
          }}
        >
          <DeleteForeverIcon />
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
            src={data?.image_url || Logo}
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
              // cursor: "pointer",
              fontSize: { xs: "16px", sm: "20px" },
            }}
            // onClick={() => {
            //   handleViewProfile();
            // }}
          >
            {currencyFormater(data?.total_workers)}
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
  data: SkillsCategoryType[];
};
const CategoriesTable = ({ data }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditCategoryDialog, setOpenEditCategoryDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<SkillsCategoryType | null>(null);
  const queryClient = useQueryClient();

  const handleOpenDeleteDialog = (value: SkillsCategoryType) => {
    setOpenDeleteDialog(true);
    setSelectedCategory(value);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const handleOpenEditCategoryDialog = (value: SkillsCategoryType) => {
    setOpenEditCategoryDialog(true);
    setSelectedCategory(value);
  };
  const handleCloseEditCategoryDialog = () => {
    setOpenEditCategoryDialog(false);
    setSelectedCategory(null);
  };
  const handleSubmitDelete = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const res = await axios.delete(
        `${baseUrl}/admin/skill-categories/${selectedCategory?.id}`,
      );
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SKILLED_USERS_CATEGORIES],
      });
      handleCloseDeleteDialog();
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ background: "#ffffff", my: 1.5, p: 1 }}>
      {openDeleteDialog && selectedCategory && (
        <GeneralConfirmDialog
          hint={`Confirm to delete "${selectedCategory?.name}" this action is not reversible`}
          open={openDeleteDialog}
          isSubmitting={isSubmitting}
          handleClose={handleCloseDeleteDialog}
          handleSubmit={handleSubmitDelete}
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
