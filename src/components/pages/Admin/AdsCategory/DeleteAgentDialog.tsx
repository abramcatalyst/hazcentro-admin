import { useState } from "react";
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
import { AgentType } from "src/types/agents";
import axios from "axios";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
// import { MdOutlineCancel } from "react-icons/md";
type Props = {
  selectedAgent: AgentType;
  open: boolean;
  handleClose: () => void;
};

function DeleteAgentDialog({ selectedAgent, open, handleClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const handleCloseDialog = () => {
    handleClose();
  };
  const handleSubmitDelete = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const res = await axios.delete(
        `${baseUrl}/admin/agents/${selectedAgent?.id}`
      );
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_AGENTS],
      });
      handleClose();
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
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
            Are you sure you want to delete “{selectedAgent?.name}”
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
          <CustomDeleteButton
            disabled={isSubmitting}
            isSubmitting={isSubmitting}
            handleClick={handleSubmitDelete}
          />
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default DeleteAgentDialog;
