import { useEffect } from "react";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IoSadOutline } from "react-icons/io5";

const ErrorFallBack = ({ error }: { error: Error }) => {
  const theme = useTheme();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <Box
      component={Paper}
      sx={{
        minHeight: "28vh",
        width: "100%",
        maxWidth: "600px",
        margin: "2px auto",
      }}
    >
      <Box
        sx={{
          mb: 1,
          color: theme.palette.common.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.error.dark
              : theme.palette.error.main,
          px: 1,
          py: 2,
        }}
      >
        <IoSadOutline
          style={{
            fontSize: "4rem",
            textAlign: "center",
          }}
        />
      </Box>
      <Box
        sx={{
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 1,
          }}
        >
          An Unexpected Error Occured
        </Typography>

        <Typography
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {error?.message}
        </Typography>
      </Box>
    </Box>
  );
};

export default ErrorFallBack;
