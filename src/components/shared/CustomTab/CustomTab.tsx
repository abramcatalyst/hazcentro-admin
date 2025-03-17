import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GLOBAL_COLORS } from "src/utils";

type Props = {
  handleClick: (e: string) => void;
  active: boolean;
  value: string;
  title: string;
  size?: "small" | "medium" | "large";
};

const CustomTab = ({ title, value, handleClick, active, size }: Props) => {
  const height = size === "small" ? "30px" : size === "large" ? "44px" : "40px";
  const fontSize =
    size === "small" ? "12px" : size === "large" ? "16px" : "14px";
  return (
    <Box
      onClick={() => {
        handleClick(value);
      }}
      sx={{
        background: active ? "#FFCC161A" : "#F7F7F9",
        cursor: "pointer",
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
      }}
    >
      <Box
        sx={{
          height: height,
          px: 1.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: 500, fontSize: { xs: "12.4px", sm: fontSize } }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          background: active ? GLOBAL_COLORS.PRIMARY_MAIN : "default",
          height: "2px",
          width: "100%",
        }}
      />
    </Box>
  );
};

export default CustomTab;
