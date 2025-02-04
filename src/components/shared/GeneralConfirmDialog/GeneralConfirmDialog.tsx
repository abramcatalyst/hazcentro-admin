import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StyledDialog from "../StyledDialog/StyledDialog";
import { dialogButtonStyles } from "src/utils";

type Props = {
  open: boolean;
  isSubmitting: boolean;
  handleSubmit: () => void;
  handleClose: () => void;
  hint: string;
};

export default function GeneralConfirmDialog({
  hint,
  open,
  isSubmitting,
  handleSubmit,
  handleClose,
}: Props) {
  const handleCloseModal = () => {
    if (isSubmitting) {
      return;
    }
    handleClose();
  };
  return (
    <StyledDialog onClose={handleCloseModal} open={open}>
      <DialogContent
        sx={{
          minWidth: (theme) => theme.breakpoints.values.sm,
          minHeight: "346px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography align="center" gutterBottom>
          {hint}
        </Typography>
        <Box
          mt={3}
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          <Button
            sx={dialogButtonStyles}
            variant="contained"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Processing" : "Yes"}
          </Button>
          <Button
            sx={dialogButtonStyles}
            variant="contained"
            color="error"
            onClick={handleCloseModal}
          >
            No
          </Button>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
