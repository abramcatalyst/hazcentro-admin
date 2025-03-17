import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MachineImg from "src/assets/tempimages/user1.png";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import RecentCloseItem from "src/components/shared/RecentCloseItem/RecentCloseItem";

const RecentClose = () => {
  return (
    <Box
      component={Paper}
      sx={{ mb: 1, p: 1, borderRadius: "20px" }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <ProfileTitle text="Recent Close by Worker" />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <RecentCloseItem
          image={MachineImg}
          title="Olayinka Adebanjo"
          caption1={`Plumber . 4 Years Experience`}
          caption2={`7m away`}
          rating={3}
        />
      </Box>
    </Box>
  );
};

export default RecentClose;
