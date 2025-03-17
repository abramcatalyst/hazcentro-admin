import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MachineImg from "src/assets/tempimages/user1.png";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import RecentCloseItem from "src/components/shared/RecentCloseItem/RecentCloseItem";

const SavedWorkersSection = () => {
  return (
    <Box
      component={Paper}
      sx={{
        p: 1,
        mb: 1,
        width: "100%",
      }}
      elevation={0}
    >
      <Box sx={{ my: 1 }}>
        <ProfileTitle text="Saved Workers" />
      </Box>

      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            background: "#F7F7F97A",
            py: 2,
            px: 1,
            borderRadius: "20px",
          }}
        >
          <RecentCloseItem
            image={MachineImg}
            title="Olayinka Adebanjo"
            caption1={`Plumber . 4 Years Experience`}
            caption2={`7m away`}
            rating={3}
          />
          <Box
            sx={{
              background: "#FF900012",
              color: "#C37004",
              py: 0.4,
              px: 1,
              borderRadius: "50px",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>Contacted (10)</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SavedWorkersSection;
