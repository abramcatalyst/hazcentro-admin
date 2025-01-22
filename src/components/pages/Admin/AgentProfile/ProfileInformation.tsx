import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ProfileInformation = () => {
  return (
    <Box component={Paper} sx={{ p: 1, borderRadius: "20px" }} elevation={0}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography>User Profile</Typography>
        <Button color="inherit">Edit</Button>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
