import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GLOBAL_COLORS } from "src/utils";

type Props = {
  handleClick: (e: string) => void;
  active: boolean;
  value: string;
  title: string;
};

const CustomTab = ({ title, value, handleClick, active }: Props) => {
  return (
    <Box
      onClick={() => {
        handleClick(value);
      }}
      sx={{
        background: active ? "#FFCC161A" : GLOBAL_COLORS.GREY_10,
        cursor: "pointer",
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
      }}
    >
      <Box
        sx={{
          height: "40px",
          px: 1.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
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
