import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";

import CustomDeleteButton from "src/components/shared/CustomDeleteButton/CustomDeleteButton";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import { CategoryType } from "src/types/categories";
// import { MdOutlineCancel } from "react-icons/md";
type Props = {
  open: boolean;
  selectedCategory: CategoryType;
  handleClose: () => void;
};

function DeleteAgentDialog({ open, handleClose }: Props) {
  const handleCloseDialog = () => {
    handleClose();
  };
  return (
    <StyledDialog fullWidth open={open} onClose={handleClose} maxWidth="sm">
      <DialogActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            px: { xs: 1, sm: 2 },
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">
            You can’t undo this after deleting
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <Divider />

        <Box mt={1}>
          <Typography sx={{ my: 1, color: "GrayText" }}>
            Are you sure you want to delete “Lydia John”
          </Typography>
        </Box>

        <Box
          sx={{ my: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button
            color="inherit"
            size="large"
            sx={{}}
            onClick={() => {
              handleCloseDialog();
            }}
          >
            Cancel
          </Button>
          <CustomDeleteButton />
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default DeleteAgentDialog;
