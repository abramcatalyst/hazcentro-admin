import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";

const HelpAndSupportWrapper = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <AppHeader text="Help & Support" />
      </Box>
    </Box>
  );
};

export default HelpAndSupportWrapper;
