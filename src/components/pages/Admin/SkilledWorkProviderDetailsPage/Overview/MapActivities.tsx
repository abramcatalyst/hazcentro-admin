import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Map from "src/assets/tempimages/map.png";
import ProfileTile from "src/components/shared/ProfileTitle/ProfileTile";

const MapActivities = () => {
  return (
    <Box
      component={Paper}
      sx={{ p: 1, borderRadius: "12px", mb: 2, pb: 4 }}
      elevation={0}
    >
      <Box sx={{ mb: 2, pl: 1.5 }}>
        <ProfileTile text="Map Activities" />
      </Box>
      <Box sx={{ height: "300px", maxHeight: "300px" }}>
        <img
          src={Map}
          alt="map"
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", mt: 2 }}>
        <Box
          sx={{
            px: 1,
            py: 0.2,
            borderRadius: "25px",
            background: "#FF95000D",
          }}
        >
          <Typography
            sx={{
              color: "#E08405",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Last seen Benjo street, Asaba
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MapActivities;
