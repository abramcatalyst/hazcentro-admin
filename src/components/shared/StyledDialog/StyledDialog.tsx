import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "24px",
    paddingTop: theme.spacing(1),
  },
}));

export default StyledDialog;
