import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteImg from "src/assets/icons/delete.svg";
const CustomDeleteButton = () => {
  return (
    <Box
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
        Delete
      </Typography>
    </Box>
  );
};

export default CustomDeleteButton;
