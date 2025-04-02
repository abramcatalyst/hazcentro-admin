import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteImg from "src/assets/icons/delete.svg";

type Props = {
  disabled?: boolean;
  isSubmitting?: boolean;
  handleClick?: () => void;
};
const CustomDeleteButton = ({ disabled, isSubmitting, handleClick }: Props) => {
  return (
    <Box
      onClick={() => {
        if (disabled || isSubmitting) {
          return null;
        }
        if (handleClick) {
          handleClick();
        }
      }}
      role="button"
      sx={{
        background: "#EE4F161A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        width: "99px",
        height: "42px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      <img src={DeleteImg} alt="" style={{ objectFit: "contain" }} />
      <Typography sx={{ fontSize: "14px", color: "#EE4F16" }}>
        {isSubmitting ? "Processing" : " Delete"}
      </Typography>
    </Box>
  );
};

export default CustomDeleteButton;
