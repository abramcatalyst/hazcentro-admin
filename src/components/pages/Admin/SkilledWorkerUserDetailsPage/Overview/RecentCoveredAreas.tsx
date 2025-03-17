import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Map from "src/assets/tempimages/map.png";
import { generateRandomIntegerInRange, statesColoursList } from "src/utils";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";

const states = ["Delta", "Abuja", "Kaduna"];
const RecentCoveredAreas = () => {
  return (
    <Box
      component={Paper}
      sx={{ p: 1, borderRadius: "12px", mb: 2, pb: 4 }}
      elevation={0}
    >
      <Box sx={{ mb: 2, pl: 1.5 }}>
        <ProfileTitle text="Recent Covered Areas" />
      </Box>
      <Box sx={{ height: "300px", maxHeight: "300px" }}>
        <img
          src={Map}
          alt="map"
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", mt: 2 }}>
        {states.map((item) => {
          const generatedColor =
            statesColoursList[
              generateRandomIntegerInRange(0, statesColoursList?.length - 1)
            ];
          return (
            <Box
              key={item}
              sx={{
                background: alpha(generatedColor, 0.1),
                px: 1,
                py: 0.2,
                borderRadius: "25px",
              }}
            >
              <Typography
                sx={{
                  color: generatedColor,
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {item}{" "}
              </Typography>{" "}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RecentCoveredAreas;
