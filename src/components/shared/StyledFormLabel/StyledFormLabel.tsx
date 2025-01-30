import { styled } from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  // "& .MuiDialog-paper": {
  //   borderRadius: "24px",
  //   paddingTop: theme.spacing(1),
  // },
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.common.black,
  mb: 1,
}));

export default StyledFormLabel;
