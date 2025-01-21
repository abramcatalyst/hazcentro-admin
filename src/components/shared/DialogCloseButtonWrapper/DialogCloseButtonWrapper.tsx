import { ReactNode } from "react";
import Box from "@mui/material/Box";

type Props = {
  children: ReactNode;
};
const DialogCloseButtonWrapper = ({ children }: Props) => {
  return (
    <Box
      sx={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F9E9E3",
        ml: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default DialogCloseButtonWrapper;
